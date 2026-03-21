import { createContext, useState } from "react";

const CldContext = createContext();

function CldProvider({ children }) {
  const [cld, setCld] = useState({});

  return (
    <CldContext.Provider value={{ cld, setCld }}>
      {children}
    </CldContext.Provider>
  );
}

export { CldProvider, CldContext };
