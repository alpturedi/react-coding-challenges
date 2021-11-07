import React from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Avatar } from "../../../assets/images/avatar.svg";
import "./_sidebar.scss";
import { UserContext } from "../../../contexts/UserContext";

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_REDIRECT } = process.env;

const handleLogin = () => {
  window.location = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_CLIENT_REDIRECT}&response_type=token&show_dialog=true`;
};

const handleLogout = () => {
  localStorage.clear();
  window.location = REACT_APP_CLIENT_REDIRECT;
};

function renderSideBarOption(link, icon, text, { selected } = {}) {
  return (
    <div
      className={cx("sidebar__option", {
        "sidebar__option--selected": selected,
      })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
}

export default function SideBar() {
  return (
    <div className="sidebar">
      <UserContext.Consumer>
        {(context) => (
          <div className="sidebar__profile">
            {context.values.image ? (
              <img
                src={context.values.image}
                width="67.5px"
                height="67.5px"
                alt="avatar"
              />
            ) : (
              <Avatar />
            )}

            {context.values.name ? (
              <>
                <p>{context.values.name}</p>
                <button variant="info" type="submit" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <p></p>
                <button variant="info" type="submit" onClick={handleLogin}>
                  Login to Spotify
                </button>
              </>
            )}
          </div>
        )}
      </UserContext.Consumer>
      <div className="sidebar__options">
        {renderSideBarOption("/", faHeadphonesAlt, "Discover", {
          selected: true,
        })}
        {renderSideBarOption("/search", faSearch, "Search")}
        {renderSideBarOption("/favourites", faHeart, "Favourites")}
        {renderSideBarOption("/playlists", faPlayCircle, "Playlists")}
        {renderSideBarOption("/charts", faStream, "Charts")}
      </div>
    </div>
  );
}
