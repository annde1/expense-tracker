import "./App.css";
import { AppRouter } from "./router/Router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";
import "./App.css";
import { Container } from "react-bootstrap";
import Layout from "./layout/Layout";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
      } else {
        // No user is signed in
        console.log("No user is signed in");
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Layout>
        <AppRouter />
      </Layout>
    </Container>
  );
}

export default App;
