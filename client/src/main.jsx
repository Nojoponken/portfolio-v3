import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { CldProvider } from "./context/CldContext";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CldProvider>
          <App />
        </CldProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
