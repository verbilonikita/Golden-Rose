//React

import React from "react";
import ReactDOM from "react-dom";
import "./style/main.scss";
import App from "./App";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
