import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AuthGuard from "../Guard/AuthGuard";
import DashboardPage from "../pages/DashboardPage";
import { BrowserRouter as Router } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};
