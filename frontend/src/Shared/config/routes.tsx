import { createBrowserRouter } from "react-router-dom";
import { CreditPage, DashboardPage, LoginPage, MainPage, ProfilePage } from "../../Pages";
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
    errorElement: <div>Ошибка</div>,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<ProfilePage />} />,
    errorElement: <div>Ошибка</div>,
  },
  {
    path: "/credit",
    element: <PrivateRoute element={<CreditPage />} />,
    errorElement: <div>Ошибка</div>,
  },
  {
    path: "/main",
    element: <PrivateRoute element={<MainPage />} />,
    errorElement: <div>Ошибка</div>,
  },
]);
