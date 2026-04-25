import "./Footer.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogin";

function Footer() {
  const { auth } = useAuth();
  const { mutate } = useLogout();

  return (
    <footer>
      <p>© 2026, Noah Alexander Lindeberg Rydén</p>
      {auth.username && (
        <>
          <p>{JSON.stringify(auth.username)}</p>
          <button onClick={mutate}>Log out</button>
        </>
      )}

      <NavLink to="/admin/login">admin</NavLink>
    </footer>
  );
}

export default Footer;
