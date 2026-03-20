import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { preventEnterSubmit } from "../utils/formUtils.js";
import apiService from "../services/apiService.js";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (password !== "" && password === passwordConfirm) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [password, passwordConfirm]);

  const createNewUser = async (event) => {
    event.preventDefault();
    console.log("Creating user...");

    const response = await apiService.registerUser(username, password);
    console.log(response);
  };

  return (
    <>
      <h2>Register page</h2>
      <form onKeyDown={preventEnterSubmit} onSubmit={createNewUser}>
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
        <input
          placeholder="Confirm password..."
          type="password"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />
        <input type="submit" value="Create new user" disabled={!canSubmit} />
        <NavLink to="/admin/login">Go to login page</NavLink>
      </form>
    </>
  );
}

export default Register;
