import { useState } from "react";
import { NavLink } from "react-router";
import { useLogin } from "../hooks/useLogin";
import ErrorBox from "../components/ErrorBox";

function Login() {
  const { error, data, mutate, isSuccess } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>Login page</h2>
      {error && <ErrorBox error={error} />}
      {isSuccess ? (
        <>
          <p>Successfully signed in! {JSON.stringify(data)}</p>
          <NavLink to="/admin">Project create page</NavLink>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
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
      )}
    </>
  );
}

export default Login;
