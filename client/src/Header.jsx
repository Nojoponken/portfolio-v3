import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <img src="sigil-bold.svg" class="logo" /> Noah Rydén
      </h1>
      <nav>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/projects"> Projects </NavLink>
        <NavLink to="/blog"> Blog </NavLink>
        <NavLink to="/contact"> Contact </NavLink>
      </nav>
    </header>
  );
}

export default Header;
