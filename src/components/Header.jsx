import { CiLogout } from "react-icons/ci";
import { logout } from "../firebase/firebaseUtils";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { NavLink } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authActions.logout());
      console.log("You are logged out.");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ marginTop: "4rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "white" }}>
          <h1>Expense</h1>
          <h2>Tracker</h2>
        </div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
            }}
          >
            <CiLogout style={{ fontSize: "2.5rem" }} />
            <p>Logout</p>
          </button>
        ) : (
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p> Create account</p>
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default Header;
