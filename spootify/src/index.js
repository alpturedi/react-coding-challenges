import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import CoreLayout from "./common/layouts/CoreLayout";
import "./styles/_main.scss";
import { UserContext, defaultValues } from "./contexts/UserContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = defaultValues;
  }

  render() {
    // The entire state is passed to the provider
    return (
      <UserContext.Provider value={this.state}>
        <CoreLayout>
          <Routes />
        </CoreLayout>
      </UserContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
