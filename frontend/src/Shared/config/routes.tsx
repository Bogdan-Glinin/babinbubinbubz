import { createBrowserRouter } from "react-router-dom";
import { DashboardPage, LoginPage } from "../../Pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <div>Ошибка</div>,
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);
