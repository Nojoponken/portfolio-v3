import { useContext, createContext, useState, useEffect } from "react";
import { backendPublic } from "../services/backend";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await backendPublic.get("/auth/refresh", {
          withCredentials: true,
        });
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setIsLoading(false);
      }
    };
    if (!auth.accessToken) {
      verifySession();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {/* The data we pass to the value prop above is available to */}
      {/* all the children of the AuthProvider component. */}
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
