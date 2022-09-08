import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import ROUTES from "./modules";
import Home from "./modules/home/Home";

function renderRoute(route: { route: string; element: JSX.Element }) {
  return <Route path={route.route} element={route.element} />;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {ROUTES.map(renderRoute)}
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
