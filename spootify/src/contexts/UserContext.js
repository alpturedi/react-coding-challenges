import React from "react";

export const defaultValues = {
  name: "tester",
  avatar: false,
  newReleases: "",
  playlists: ["alp, test"],
  browse: [],
};

export const UserContext = React.createContext(defaultValues);
