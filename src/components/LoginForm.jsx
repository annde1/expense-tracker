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
      console.log(err);
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
      <div className="pageContainer">
        <div className="loginFormContainer">
          <h1 className="pageTitle">Login</h1>
          <Form className="form" onSubmit={handleEmailAndPasswordLogin}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                className="input"
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
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            {error && <p style={{ color: "white" }}>{error}</p>}
            <Button className="button" type="submit">
              Sign In
            </Button>
          </Form>
          <p className="loginWith">Or login with</p>
          <div className="providersContainer">
            <button className="customButton" onClick={handleGoogleLogin}>
              <FaGoogle className="providerButton" />
            </button>
            <button className="customButton" onClick={handleGitHubLogin}>
              <FaGithub className="providerButton" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
