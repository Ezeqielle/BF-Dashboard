import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { useState } from "react";

import Overview from "./pages/overview/Overview";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Dropdown from "./components/dropdown/Dropdown";

import "./styles/global.scss";

function App() {
  const Layout =() => {
    const [selectedFolder, setSelectedFolder] = useState<string>('');
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            {/*<Dropdown setSelectedFolder={setSelectedFolder} /> {/* Pass setSelectedFolder to Menu */}
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
      path: "/overview",
      element: <Layout />,
      children: [
        {
          path: "/overview",
          element: <Overview />
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