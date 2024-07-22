import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useDispatch } from "react-redux";

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (err) {
    throw new Error(err.message);
  }
};
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("LOGGED OUT");
  } catch (err) {
    throw new Error(err);
  }
};
