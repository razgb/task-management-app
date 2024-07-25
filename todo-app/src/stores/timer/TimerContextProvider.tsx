import { useReducer } from "react";
import { TimerContext } from "./TimerContext";

export type ReducerStateType = {
  timerValue: number;
  timerState: "running" | "paused" | "stopped";
  timerSettings: {
    breakDuration: number;
    workDuration: number;
    autoSwitch: boolean;
  };
};

export type ReducerActionType = {
  payload: Partial<ReducerStateType>;
  type: "updateTimerValue" | "updateTimerState" | "updateTimerSettings";
};

function reducer(
  state: ReducerStateType,
  action: ReducerActionType,
): ReducerStateType {
  if (action.payload == undefined) return state;
  const payload = action.payload;

  switch (action.type) {
    case "updateTimerValue": {
      if (payload.timerValue == undefined || payload.timerValue < 0) {
        return state;
      }

      return { ...state, timerValue: payload.timerValue };
    }
    case "updateTimerState": {
      if (payload.timerState == undefined) {
        return state;
      }

      return { ...state, timerState: payload.timerState };
    }
    case "updateTimerSettings": {
      return {
        ...state,
        timerSettings: {
          ...state.timerSettings,
          ...payload.timerSettings,
        },
      };
    }
    default:
      console.warn(
        "Seems to be an error, default switch case reached inside the timer context.",
      );
      return state;
  }
}

export default function TimerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    timerValue: 0,
    timerState: "stopped",
    timerSettings: {
      breakDuration: 5,
      workDuration: 25,
      autoSwitch: true,
    },
  });

  return (
    <TimerContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
