import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { firestore } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (err) {
    throw err;
  }
};
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user;
  } catch (err) {
    throw err;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (err) {
    throw err;
  }
};

export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (err) {
    throw err;
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

export const createNewExpense = async (expense) => {
  try {
    const docRef = await addDoc(collection(firestore, "expenses"), expense);
    return docRef;
  } catch (err) {
    throw err;
  }
};
