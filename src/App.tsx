import Layout from "layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ROUTES from "./modules";

function renderRoute(route: { route: string; element: JSX.Element }) {
  return (
    <Route
      key={route.route}
      path={route.route}
      element={<Layout>{route.element}</Layout>}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>{ROUTES.map(renderRoute)}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
