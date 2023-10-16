import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";

import "./styles/global.scss"

function App() {
  const Layout =() => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {/*
          path: "/addingdashboard",
          element: <Addingdashboard />
      */},
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App