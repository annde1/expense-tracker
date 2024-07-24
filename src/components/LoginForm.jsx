import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginWithEmailAndPassword,
  signInWithGitHub,
  signInWithGoogle,
} from "../firebase/firebaseUtils";
import { authActions } from "../store/authenticationSlice";
import { ROUTES } from "../router/routes";
import { useState } from "react";
import { formatError } from "../helpers/helpers";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
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

  const handleEmailAndPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginWithEmailAndPassword(email, password);
      dispatch(
        authActions.login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const error = formatError(err.code);
      setError(error);
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
        <div className="login-container">
          <h2
            style={{
              color: "white",
              marginTop: "3rem",
              marginBottom: "2rem",
            }}
          >
            Login
          </h2>
          <Form style={{ width: "60%" }} onSubmit={handleEmailAndPasswordLogin}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            {error && <p style={{ color: "white" }}>{error}</p>}
            <Button
              variant="info"
              type="submit"
              color="primary"
              style={{ color: "white" }}
            >
              Sign In
            </Button>
          </Form>
          <p style={{ color: "white", fontWeight: "600" }}>Or login with:</p>
          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              marginTop: "0.5rem",
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
