import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { validateRegister } from "../validation/validation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import { registerWithEmailAndPassword } from "../firebase/firebaseUtils";
import { formatError } from "../helpers/helpers";
function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const error = validateRegister(email, password, repeatPassword);
      if (Object.keys(error).length > 0) {
        setErrors(error);
        return;
      }
      console.log("OK");
      await registerWithEmailAndPassword(email, password);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      const error = formatError(err.code);
      setRegistrationError(error);
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
          <Form style={{ width: "60%" }} onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
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
            <Form.Group className="mb-3" controlId="formBasicPasswordRepat">
              <Form.Control
                type="password"
                placeholder="Repeat password"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </Form.Group>
            {registrationError && (
              <p style={{ color: "white" }}>{registrationError}</p>
            )}
            {errors && errors.email && (
              <p style={{ color: "white" }}>{errors.email}</p>
            )}
            {errors && errors.password && (
              <p style={{ color: "white" }}>{errors.password}</p>
            )}
            <Button
              color="primary"
              style={{ color: "white" }}
              type="submit"
              variant="info"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
export default RegisterForm;
