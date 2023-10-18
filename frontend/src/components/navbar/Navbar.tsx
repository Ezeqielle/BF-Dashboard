import { Link } from "react-router-dom"
import "./navbar.scss"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/busi.svg" alt=""/>
        <span>Security Repport</span>
        <Link to="/newView">
          <button>Create New View</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar