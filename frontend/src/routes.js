/**
 * @fileoverview Configuration des routes de l'application
 * @module routes
 */

import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HowItWorks from "./components/HowItWorks/HowItWorks";

/**
 * Configuration du routeur de l'application
 * @constant {Object} router
 * @description Définit les routes principales de l'application avec leurs composants associés
 */
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
    {
      path: "/how-it-works",
      element: <HowItWorks />,
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
