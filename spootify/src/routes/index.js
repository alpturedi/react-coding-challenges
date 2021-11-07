import React from "react";
import Discover from "./Discover";
import { UserContext } from "../contexts/UserContext";
import { get } from "../api/api";

//Expects location.hash
function tokenParser(locationHash) {
  return locationHash
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
}

async function getUser(updateName) {
  const API_URL = "https://api.spotify.com/v1/me";
  const result = await get(API_URL);

  //console.log("RESULT ME : ", result);
  updateName(result.display_name, result.images[0].url);
}

async function getNewReleases(updateList) {
  const API_URL = "https://api.spotify.com/v1/browse/new-releases";
  const result = await get(API_URL);

  //console.log("RESULT RELEASES : ", result);
  updateList("newReleases", result.albums.items);
}

async function getCategories(updateList) {
  const API_URL = "https://api.spotify.com/v1/browse/categories";
  const result = await get(API_URL);

  //console.log("RESULT CATEGORIES : ", result);
  updateList("categories", result.categories.items);
}

async function getPlaylists(updateList) {
  const API_URL = "https://api.spotify.com/v1/browse/featured-playlists";
  const result = await get(API_URL);

  //console.log("RESULT PLAYLISTS : ", result);
  updateList("playlists", result.playlists.items);
}

export default function Routes(props) {
  // Here you'd return an array of routes

  const values = React.useContext(UserContext);

  let location = window.location;
  const currentTime = new Date().getTime();
  const expiryTime = localStorage.getItem("expiry_time");
  const isSessionValid = currentTime < expiryTime;

  if (isSessionValid) {
    getUser(props.updateName);
    getNewReleases(props.updateList);
    getCategories(props.updateList);
    getPlaylists(props.updateList);
  }

  if (location.pathname === "/callback/") {
    if (location.search.indexOf("error") === -1) {
      const access_token = tokenParser(location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem("params", JSON.stringify(access_token));
      localStorage.setItem("expiry_time", expiryTime);
      document.location.href = "/";
    }
  }

  return <Discover />;
}
