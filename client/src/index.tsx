import React from "react";
import ReactDOM from "react-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";

const render = () => {
  const App = require("./app/App").default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

// allow app hot reload
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}
