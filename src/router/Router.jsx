import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AuthGuard from "../Guard/AuthGuard";
import DashboardPage from "../pages/DashboardPage";
// import { BrowserRouter as Router } from "react-router-dom";
import NewExpensePage from "../pages/NewExpensePage";
import GuestGuard from "../Guard/GuestGuard";
//TODO: Homepage
export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.REGISTER}
        element={
          <GuestGuard>
            <RegisterPage />
          </GuestGuard>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.NEWEXPENSE}
        element={
          <AuthGuard>
            <NewExpensePage />
          </AuthGuard>
        }
      />
    </Routes>
  );
};
