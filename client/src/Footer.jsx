import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <p>© 2026, Noah Alexander Lindeberg Rydén</p>
      <NavLink to="/admin/login">admin</NavLink>
    </footer>
  );
}

export default Footer;
