import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default router;
