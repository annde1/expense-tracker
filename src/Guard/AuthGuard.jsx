import { Navigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { useSelector } from "react-redux";

function AuthGuard({ children }) {
  const { loggedIn } = useSelector((state) => state.authentication);

  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
}

export default AuthGuard;
