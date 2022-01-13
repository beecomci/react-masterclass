import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111"
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke"
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
