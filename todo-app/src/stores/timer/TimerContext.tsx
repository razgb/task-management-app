import { createContext, Dispatch } from "react";
import { ReducerActionType, ReducerStateType } from "./TimerContextProvider";

// useReducer state type:
export type TimerContextType = {
  state: ReducerStateType;
  dispatch: Dispatch<ReducerActionType>;
};

export const TimerContext = createContext<undefined | TimerContextType>(
  undefined,
);
