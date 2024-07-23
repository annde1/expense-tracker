import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../router/routes";

function GuestGuard({ children }) {
  const { loggedIn } = useSelector((state) => state.authentication);

  if (loggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace={true} />;
  }
  return children;
}
export default GuestGuard;
