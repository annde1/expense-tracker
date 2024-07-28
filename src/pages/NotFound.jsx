import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <div className="notFoundPageContainer ">
      <div className="notFoundHeadingContainer">
        <p className="fourOfour">404</p>
        <p
          style={{
            color: "white",
            fontSize: "3rem",
            marginRight: "1rem",
            fontWeight: "200",
          }}
        >
          |
        </p>
        <p className="fourOfourText">The page you requested was not found.</p>
      </div>
      <NavLink style={{ color: "white" }} to="/dashboard">
        Go to dashboard
      </NavLink>
    </div>
  );
}
export default NotFound;
