import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState(null); // Initialize the state with null
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once auth state is checked
    });

    return () => unsubscribe(); // Clean-up the listener on component unmount
  }, []);

  return { user, loading }; // Return user and loading state
};
