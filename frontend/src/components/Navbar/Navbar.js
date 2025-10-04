import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <header role="banner">
      <nav
        className="layout-container"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link to="/" aria-label="Go to home page">
          Assessment UI
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
