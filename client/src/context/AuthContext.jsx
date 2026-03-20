import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  const value = { auth, setAuth };

  return (
    <AuthContext.Provider value={value}>
      {/* The data we pass to the value prop above is available to */}
      {/* all the children of the AuthProvider component. */}
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
