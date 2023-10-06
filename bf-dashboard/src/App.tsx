import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Addingdashboard from "./pages/addingdashboard/Addingdashboard";
import Home from "./pages/home/Home";
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
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        },
        {
          path: "/addingdashboard",
          element: <Addingdashboard />
        },
      ]
    },
    {
      path: "/home",
      element: <Home />,
    }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App