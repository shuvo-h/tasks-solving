import {
  RouteObject,
    createBrowserRouter,
  } from "react-router-dom";
  import Home from "../pages/home/Home"
import About from "../pages/about/About";
import Layout from "../pages/layout/Layout";
import { toolRoutes } from "../pages/layout/routes/toolRoutes";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: ()=><div>Loading...</div>,
    },
    {
      path: "/about",
      element: <About />,
      loader: ()=><div>Loading...</div>,
    },
    
    {
      path: toolRoutes.prefix,
      element: <Layout />,
      loader: ()=><div>Loading...</div>,
      children: [
        ...toolRoutes.routes as RouteObject[],
        /*
        {
          path: "team",
          element: <Team />,
          loader: ()=><div>Loading...</div>,
        },
        */
      ],
    },
    
  ]);