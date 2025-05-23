import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import HelpPage from "./pages/HelpPage";
import OffersPage from "./pages/OffersPage";
import CorporatePage from "./pages/CorporatePage";
import OtherPage from "./pages/OtherPage";
import AppLayout from "./layout/AppLayout";
import RestaurantList from "./pages/RestaurantList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "signin", element: <SignIn /> },
      { path: "other", element: <OtherPage /> },
      { path: "help", element: <HelpPage /> },
      { path: "offers", element: <OffersPage /> },
      { path: "corporate", element: <CorporatePage /> },
      { path: "restaurant", element: <RestaurantList /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
