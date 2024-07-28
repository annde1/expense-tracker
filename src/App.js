import "./App.css";
import { AppRouter } from "./router/Router";
import "./App.css";
import { Container } from "react-bootstrap";
import Layout from "./layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Container>
      <Layout>
        <ToastContainer />
        <AppRouter />
      </Layout>
    </Container>
  );
}

export default App;
