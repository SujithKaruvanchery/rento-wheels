import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Hero from "../pages/user/Hero";
import AboutUs from "../pages/user/AboutUs";
import ContactUs from "../pages/user/ContactUs";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import Vehicles from "../pages/user/Vehicles";
import CarDetails from "../pages/user/CarDetails";
import ErrorPage from "../pages/shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Hero /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/vehicles", element: <Vehicles /> },
      { path: "/car-details/:carId", element: <CarDetails /> },
    ],
  },
]);
export default router;
