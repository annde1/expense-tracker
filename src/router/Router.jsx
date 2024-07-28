import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AuthGuard from "../Guard/AuthGuard";
import DashboardPage from "../pages/DashboardPage";
import NewExpensePage from "../pages/NewExpensePage";
import GuestGuard from "../Guard/GuestGuard";
import NotFound from "../pages/NotFound";
import EditExpensePage from "../pages/EditExpensePage";

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
        path={ROUTES.HOME}
        element={
          <AuthGuard>
            <Navigate to={ROUTES.DASHBOARD} />
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
      <Route
        path={`${ROUTES.EDITEXPENSE}/:id`}
        element={
          <AuthGuard>
            <EditExpensePage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
