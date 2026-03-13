import { useState, useEffect } from "react";
import { NavLink } from "react-router";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  /* Code written by AI */
  const preventEnterSubmit = (event) => {
    // Check if the key pressed was Enter
    // AND check that the user isn't currently in a textarea
    if (event.key === "Enter" && event.target.tagName === "INPUT") {
      event.preventDefault();
    }
  };
  /* End of code written by AI */

  useEffect(() => {
    if (password !== "" && password === passwordConfirm) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [password, passwordConfirm]);

  const createNewUser = (event) => {
    event.preventDefault();
    console.log("Creating user...");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("http://localhost:3500/users", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          const msg = (data && data.message) || response.status;
          console.log("User created! ", msg);
        }
      })
      .catch((error) => {
        console.error("Error when fetching: ", error);
      });
  };

  return (
    <main>
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
    </main>
  );
}

export default Register;
