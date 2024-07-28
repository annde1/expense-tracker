import { CiLogout } from "react-icons/ci";
import { logout } from "../firebase/firebaseUtils";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authActions.logout());
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="header">
      <div className="headerContainer">
        <div style={{ color: "white" }}>
          <h1>Expense</h1>
          <h2>Tracker</h2>
        </div>
        {loggedIn ? (
          <button onClick={handleLogout} className="customButton">
            <CiLogout className="logoutButton" />
            <p className="logoutButtonTitle">Logout</p>
          </button>
        ) : (
          <NavLink
            to={location.pathname === "/register" ? "/login" : "/register"}
            className="navLink"
          >
            <p>
              {location.pathname === "/register" ? "Login" : "Create account"}
            </p>
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default Header;
