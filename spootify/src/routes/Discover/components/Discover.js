import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import { UserContext } from "../../../contexts/UserContext";

export default class Discover extends Component {
  static contextType = UserContext;
  render() {
    return (
      <div className="discover">
        {this.context.values.name ? (
          <>
            <DiscoverBlock
              text="RELEASED THIS WEEK"
              id="released"
              data={this.context.values.newReleases}
            />
            <DiscoverBlock
              text="FEATURED PLAYLISTS"
              id="featured"
              data={this.context.values.playlists}
            />
            <DiscoverBlock
              text="BROWSE"
              id="browse"
              data={this.context.values.categories}
              imagesKey="icons"
            />
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
