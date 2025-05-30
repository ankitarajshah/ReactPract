import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import PrivateRoute from "../src/components/common/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResAppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RestaurantList /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },

      { path: "corporate", element: <CorporatePage /> },
      { path: "search", element: <RestaurantList /> },
      { path: "offers", element: <OffersPage /> },
      { path: "help", element: <HelpPage /> },
      { path: "other", element: <OtherPage /> },

      { path: "restaurant/:id", element: <RestaurantMenu /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "cart", element: <Cart /> },
          { path: "checkout", element: <Checkout /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
