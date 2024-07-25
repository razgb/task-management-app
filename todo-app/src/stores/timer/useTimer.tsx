import { useContext } from "react";
import { TimerContext } from "./TimerContext";

export default function useTimer() {
  const Context = useContext(TimerContext);
  if (Context == undefined) {
    throw new Error(
      "Component must be contained inside the TimerContextProvider component to work correctly.",
    );
  }

  return Context;
}
