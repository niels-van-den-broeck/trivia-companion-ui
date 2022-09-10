import { useAuthentication } from "@context/AuthContext";
import { Navigate } from "react-router";

type RequireAuthProps = {
  children: JSX.Element | JSX.Element[];
};
export function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuthentication();

  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
}
