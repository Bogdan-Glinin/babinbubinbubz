import { createBrowserRouter } from "react-router-dom";
import { DashboardPage, LoginPage, MainPage } from "../../Pages";
import PrivateRoute from "./../ui/private-route";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <div>Ошибка</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<div>Профиль</div>} />,
  },
  {
    path: "/main",
    element: <PrivateRoute element={<MainPage />} />,
  },
]);
