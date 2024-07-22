import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//onAuthStateChanged - firebase function that listens for changes in authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null); // init the state with null, we are going to keep the current authenticated user object here
  useEffect(() => {
    //Set up listener for authentication state changes. onAuthStateChanged takes in two args: 1) firebase auth instance 2) callback function that updates the user state with the current user object whenever it changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); //clean-up
  }, []);
  return { user }; //return user state
};
