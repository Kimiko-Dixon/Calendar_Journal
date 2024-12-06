import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import LoginSignupPage from "./pages/LoginSignupPage.jsx";
import Calendar from "./pages/Calendar.jsx";
import Journal from "./pages/Journal.jsx";
import Nav from "./components/Nav.jsx";
// import './index.css'
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import Landing from "./pages/Landing.jsx";
import User from "./pages/User.jsx";
import Auth from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <LoginSignupPage />,
      },
      {
        element: <User loggedIn={Auth.loggedIn()} />,
        children: [
          {
            path: "/calendar",
            element: <Calendar />,
          },
          {
            path: "/journal",
            element: <Journal />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider value={system}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
