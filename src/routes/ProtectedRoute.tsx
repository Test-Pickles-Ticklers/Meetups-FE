import React from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return element;
};

export default ProtectedRoute;
