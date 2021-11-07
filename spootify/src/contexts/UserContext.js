import React from "react";

export const defaultValues = {
  name: false,
  image: false,
  newReleases: [],
  playlists: [],
  categories: [],
};

export const UserContext = React.createContext({
  defaultValues,
  updateName: () => {},
  updateList: () => {},
});
