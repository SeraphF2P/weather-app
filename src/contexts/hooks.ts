import { useContext } from "react";
import { Context } from "./CoordinatesContext";

export function useCoordinatesState() {
  return useContext(Context);
}