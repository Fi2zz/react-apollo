import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Apollo } from "./apollo/Apollo";

ReactDOM.render(
  <Apollo>
    <App />
  </Apollo>,
  document.getElementById("root")
);
