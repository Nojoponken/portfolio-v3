import "./Header.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/sigil-bold.svg";

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen((prev) => !prev);
  const closeNav = () => setNavOpen(false);

  return (
    <header>
      <h1>
        <img src={logo} className="logo" alt="" />
        Noah Rydén
      </h1>
      <button
        className="nav-toggle"
        onClick={toggleNav}
        aria-label="Toggle navigation menu"
        aria-expanded={navOpen}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <nav className={navOpen ? "open" : ""}>
        <NavLink to="/" end onClick={closeNav}>
          Home
        </NavLink>
        <NavLink to="/projects" onClick={closeNav}>
          Projects
        </NavLink>
        <NavLink to="/contact" onClick={closeNav}>
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
