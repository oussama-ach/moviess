import React from "react";
import ReactDOM from "react-dom/client";
import Movie from "./api/Movie.jsx";
import Show from "./api/Show.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
