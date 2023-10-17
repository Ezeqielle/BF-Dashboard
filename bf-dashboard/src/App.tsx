import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import "./styles/global.scss";

import Overview from "./pages/overview/Overview";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import NewView from "./pages/newView/NewView";

function App() {
  const Layout =() => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
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
      ],
    },
    {
      path: "/newView",
      element: <NewView />
    }   
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App