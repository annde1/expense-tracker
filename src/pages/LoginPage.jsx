import { signInWithGoogle } from "../firebase/firebaseUtils";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authenticationSlice";
import { logout } from "../firebase/firebaseUtils";

function LoginPage() {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authenticationSlice.userData);
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log(user);
      dispatch(
        authActions.login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authActions.logout()); // Ensure to dispatch logout action
    } catch (err) {
      console.log(err);
    }
  };
  const handleUser = () => {
    console.log(userData);
  };
  return (
    <>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>GOOGLE</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleUser}>Show user</button>
    </>
  );
}

export default LoginPage;
