import { signInWithGoogle } from "../firebase/firebaseUtils";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authenticationSlice";
import { logout } from "../firebase/firebaseUtils";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <>
      <LoginForm />

      {/* <button onClick={handleUser}>Show user</button> */}
    </>
  );
}

export default LoginPage;
