import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./pages/Test";
import RegisterPage from "./pages/Register";
import Profil from "./pages/Profil";
import Message from "./pages/Message"
import Notif from "./pages/Notif";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profil",
    element: <Profil info="with-post"/>,
  },
  {
    path: "/profil/with-replies",
    element: <Profil info="with-replies"/>,
  },
  {
    path: "/messagerie",
    element: <Message />,
  },
  {
    path: "/notif",
    element: <Notif />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
