import React from "react";
import ReactDOM from "react-dom";
import "./inc/index.css";
import App from "./App";
import registerServiceWorker from "./util/registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
