import { Navigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AuthGuard({ children }) {
  const loggedIn = useSelector((state) => state.authenticationSlice.loggedIn);
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);
  if (!loggedIn) {
    return <p>Waiting...</p>;
  }
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
}

export default AuthGuard;
