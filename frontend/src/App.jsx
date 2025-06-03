import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROLES } from "./context/AuthContext"; // Import ROLES

import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import HelpPage from "./pages/HelpPage";
import OffersPage from "./feature/OffersPage";
import CorporatePage from "./feature/CorporatePage";
import OtherPage from "./feature/OtherPage";
import ResAppLayout from "./components/layout/ResAppLayout";
import RestaurantList from "./pages/RestaurantList";
import Checkout from "./pages/Checkout";
import RestaurantMenu from "./pages/RestaurantMenu";
import PrivateRoute from "./components/common/PrivateRoute";
import ForbiddenPage from "./pages/ForbiddenPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResAppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RestaurantList /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "403", element: <ForbiddenPage /> },
      {
        path: "city/ahmedabad/:id",
        element: <RestaurantMenu />,
      },
      {
        element: <PrivateRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          { path: "corporate", element: <CorporatePage /> },
          { path: "offers", element: <OffersPage /> },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={[ROLES.MANAGER]} />,
        children: [{ path: "other", element: <OtherPage /> }],
      },
      {
        element: <PrivateRoute allowedRoles={[ROLES.SUPER_ADMIN]} />,
        children: [{ path: "help", element: <HelpPage /> }],
      },
      {
        element: <PrivateRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]} />,
        children: [
          { path: "cart", element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
          { path: "search", element: <RestaurantList /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
   <RouterProvider router={router} />
     
  
  );
}
