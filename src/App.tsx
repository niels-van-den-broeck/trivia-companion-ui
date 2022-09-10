import { RequireAuth } from "components/AuthenticatedRoute";
import Layout from "layout/Layout";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ROUTES from "./modules";

function renderRoute(route: {
  route: string;
  element: JSX.Element;
  requireAuth: boolean;
}) {
  const Wrapper = route.requireAuth ? RequireAuth : Fragment;
  return (
    <Route
      key={route.route}
      path={route.route}
      element={
        <Wrapper>
          <Layout>{route.element}</Layout>
        </Wrapper>
      }
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
