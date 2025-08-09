import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Schedule from "./pages/public/Schedule";
import Persons from "./pages/public/Persons";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/schedule" replace /> },
        { path: "/schedule", element: <Schedule /> },
        { path: "/persons", element: <Persons /> },
      ],
    },
  ],
  { basename: "/sistema-medico" }
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
