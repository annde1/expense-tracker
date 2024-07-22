import { useState } from "react";
import "./App.css";
import {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  signInWithGoogle,
  logout,
} from "./firebase/firebaseUtils";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginWithEmailAndPassword(email, password);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      console.log("you have been logged out");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
      <button onClick={handleGoogleLogin}>GOOGLE</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
