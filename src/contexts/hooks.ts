import { useContext } from "react";
import { Context } from "./CordinateContext";

export function useCordinateState() {
  return useContext(Context);
}