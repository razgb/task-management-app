import { Reducer, useEffect, useReducer, useRef, useState } from "react";
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
  payload: Partial<ReducerStateType> | number | null;
  type: "updateTimer" | "activate" | "pause" | "reset" | "updateTimerSettings";
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
    case "updateTimer": {
      if (state.timerValue === 0 || typeof payload !== "number") {
        return {
          ...defaultTimerState,
        };
      }

      return {
        ...state,
        timerValue: state.timerValue - payload,
        timerState: "active",
      };
    }

    case "activate": {
      return {
        ...state,
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
      if (payload == null || typeof payload === "number") {
        console.warn(
          "error updating timer settings in switch branch, received null or number value instead an object of ReducerActionType.",
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

    // return state;
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

  const [animationState, setAnimationState] = useState<"on" | "off">("off");
  const rAF_ID = useRef<number | undefined>(undefined);

  const lastUpdateTime = useRef<number>(0);
  const accumulatedTime = useRef<number>(0);

  function countDownTimer() {
    const interval = 1000; // 1 second

    const updateTimer = (currentTime: number) => {
      if (lastUpdateTime.current === 0) {
        lastUpdateTime.current = currentTime;
      }

      const elapsedTime = currentTime - lastUpdateTime.current;
      accumulatedTime.current += elapsedTime;

      if (accumulatedTime.current >= interval) {
        const secondsToSubtract = Math.floor(accumulatedTime.current / 1000);
        dispatch({ payload: secondsToSubtract, type: "updateTimer" });
        accumulatedTime.current %= 1000; // Keep the remainder for the next update
      }

      lastUpdateTime.current = currentTime;
      rAF_ID.current = requestAnimationFrame(updateTimer);
    };

    // Start the animation (recursive function)
    rAF_ID.current = requestAnimationFrame(updateTimer);
  }

  useEffect(() => {
    const timerState = state.timerState;
    const animationID = rAF_ID.current;

    switch (timerState) {
      case "active": {
        if (animationState === "off") {
          setAnimationState("on");
          lastUpdateTime.current = 0; // Reset the last update time
          accumulatedTime.current = 0; // Reset the accumulated time
          countDownTimer();
        }
        break;
      }
      case "paused": {
        if (animationID) {
          cancelAnimationFrame(animationID);
          setAnimationState("off");
        }
        break;
      }
      case "stopped": {
        if (animationID) {
          cancelAnimationFrame(animationID);
          setAnimationState("off");
        }
      }
    }
  }, [state.timerState, animationState]);

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
