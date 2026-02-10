import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Noah Rydén</h1>
      <nav>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/projects"> Projects </NavLink>
      </nav>
    </header>
  );
}

export default Header;
