import { useState } from "react";
import { NavLink } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <h2>Login page</h2>
      <form>
        <input
          placeholder="Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="Sign In" />
        <NavLink to="/admin/register">Go to register page</NavLink>
      </form>
    </main>
  );
}

export default Login;
