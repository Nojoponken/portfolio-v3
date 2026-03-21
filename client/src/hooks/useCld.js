import { useContext } from "react";
import { CldContext } from "../context/CldContext";

function useCld() {
  return useContext(CldContext);
}

export default useCld;
