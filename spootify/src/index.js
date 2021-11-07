import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import CoreLayout from "./common/layouts/CoreLayout";
import "./styles/_main.scss";
import { UserContext, defaultValues } from "./contexts/UserContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateName = (newName, newImage) => {
      this.setState((state) => {
        if (state.values.name !== newName) {
          state.values.name = newName;
          state.values.image = newImage;
          return state;
        }
      });
    };

    this.updateList = (listName, newList) => {
      this.setState((state) => {
        if (
          JSON.stringify(state.values[listName]) !== JSON.stringify(newList)
        ) {
          state.values[listName] = newList;
          return state;
        }
      });
    };

    this.state = {
      values: defaultValues,
      updataName: this.updateName,
      updateLists: this.updateList,
    };
  }

  render() {
    return (
      <React.StrictMode>
        <UserContext.Provider value={this.state}>
          <CoreLayout>
            <Routes updateName={this.updateName} updateList={this.updateList} />
          </CoreLayout>
        </UserContext.Provider>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
