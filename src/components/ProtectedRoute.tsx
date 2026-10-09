import * as React from "react";
import { useNavigate } from "@tanstack/react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate({ to: "/superadmin/login", replace: true });
      return;
    }

    setIsAuthorized(true);
  }, [navigate]);

  return isAuthorized ? <>{children}</> : null;
}
