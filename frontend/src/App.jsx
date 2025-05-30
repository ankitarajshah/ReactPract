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

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResAppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RestaurantList /> },
      { path: "corporate", element: <CorporatePage /> },
      { path: "search", element: <RestaurantList /> },
      { path: "offers", element: <OffersPage /> },
      { path: "help", element: <HelpPage /> },
      { path: "signin", element: <SignIn /> },
      { path: "cart", element: <Cart /> },
      { path: "other", element: <OtherPage /> },
      { path: "offers", element: <OffersPage /> },
      { path: "checkout", element: <Checkout /> },
      { path: "restaurant/:id", element: <RestaurantMenu /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
