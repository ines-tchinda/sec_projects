import React from "react";
import ReactDOM from "react-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import App from "App";

const root = document.getElementById('root');

ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  root
);

