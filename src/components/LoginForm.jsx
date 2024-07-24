import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithGitHub, signInWithGoogle } from "../firebase/firebaseUtils";
import { authActions } from "../store/authenticationSlice";
import { ROUTES } from "../router/routes";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      // console.log(user);
      dispatch(
        authActions.login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.log(err.code);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const user = await signInWithGitHub();
      console.log(user);
      dispatch(
        authActions.login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2.5rem",
        }}
      >
        <div
          style={{
            width: "70%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "white",
              marginTop: "3rem",
              marginBottom: "2rem",
            }}
          >
            Login
          </h2>
          <Form style={{ width: "60%" }}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              variant="info"
              type="submit"
              color="primary"
              style={{ color: "white" }}
            >
              Sign In
            </Button>
          </Form>
          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
              }}
              onClick={handleGoogleLogin}
            >
              <FaGoogle
                style={{
                  color: "white",
                  fontSize: "2rem",
                  marginRight: "1rem",
                }}
              />
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
              }}
              onClick={handleGitHubLogin}
            >
              <FaGithub style={{ color: "white", fontSize: "2rem" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
