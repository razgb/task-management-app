import { createContext, Dispatch } from "react";

export type ReducerStateType = {
  timerValue: number;
  timerMode: "work" | "break";
  timerState: "active" | "paused" | "off";
  timerSettings: {
    breakDuration: number;
    workDuration: number;
    autoSwitch: boolean;
  };
};

export type ReducerActionType = {
  payload: Partial<ReducerStateType> | number | null;
  type:
    | "updateTimer"
    | "activate"
    | "pause"
    | "reset"
    | "updateTimerSettings"
    | "toggleMode"
    | "addTime";
};

// useReducer state type:
export type TimerContextType = {
  state: ReducerStateType;
  dispatch: Dispatch<ReducerActionType>;
};

export const TimerContext = createContext<TimerContextType | undefined>(
  undefined,
);
