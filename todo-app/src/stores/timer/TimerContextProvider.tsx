import { Reducer, useEffect, useReducer, useRef } from "react";
import { TimerContext } from "./TimerContext";

export type ReducerStateType = {
  timerValue: number;
  timerState: "active" | "paused" | "stopped";
  timerSettings: {
    breakDuration: number;
    workDuration: number;
    autoSwitch: boolean;
  };
};

export type ReducerActionType = {
  payload: Partial<ReducerStateType> | null;
  type: "countDown" | "pause" | "reset" | "updateTimerSettings";
};

const defaultTimerState: ReducerStateType = {
  timerValue: 25 * 60, // seconds
  timerState: "paused",
  timerSettings: {
    breakDuration: 5 * 60,
    workDuration: 25 * 60,
    autoSwitch: true,
  },
};

function reducer(
  state: ReducerStateType,
  action: ReducerActionType,
): ReducerStateType {
  const payload = action.payload;

  switch (action.type) {
    case "countDown": {
      if (state.timerValue == 0) {
        return {
          ...defaultTimerState,
        };
      }

      return {
        ...state,
        timerValue: state.timerValue - 1,
        timerState: "active",
      };
    }

    case "pause": {
      return {
        ...state,
        timerState: "paused",
      };
    }

    case "reset": {
      return {
        ...defaultTimerState,
      };
    }

    case "updateTimerSettings": {
      if (payload == null) {
        console.warn(
          "payload equals null in updateTimerSettings switch branch.",
        );
        return state;
      }

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
  const [state, dispatch] = useReducer<
    Reducer<ReducerStateType, ReducerActionType>
  >(reducer, defaultTimerState);

  const intervalRef = useRef<number | undefined>(undefined); // doesn't refresh component. maintains state.

  useEffect(() => {
    const timerState = state.timerState;

    switch (timerState) {
      case "active": {
        intervalRef.current = setInterval(() => {
          dispatch({ payload: null, type: "countDown" });
        }, 1000);
        break;
      }
      case "paused": {
        clearInterval(intervalRef.current);
        break;
      }
      case "stopped": {
        clearInterval(intervalRef.current);
        break;
      }
    }
  }, [state.timerState]);

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
