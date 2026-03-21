import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { preventEnterSubmit } from "../utils/formUtils";
import { useRegister } from "../hooks/useLogin";
import ErrorBox from "../components/ErrorBox";

function Register() {
  const { error, data, mutate, isSuccess } = useRegister();

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
    mutate({ username, password });
  };

  return (
    <>
      <h2>Register page</h2>
      {error && <ErrorBox error={error} />}
      {isSuccess ? (
        <p>Account created! {JSON.stringify(data)}</p>
      ) : (
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
      )}{" "}
    </>
  );
}

export default Register;
