import { Reducer, useEffect, useReducer, useRef, useState } from "react";
import { TimerContext } from "./TimerContext";
import reducer, { defaultTimerState } from "./reducer";
import { ReducerStateType, ReducerActionType } from "./TimerContext";

export default function TimerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer<
    Reducer<ReducerStateType, ReducerActionType>
  >(reducer, defaultTimerState);

  const [animationState, setAnimationState] = useState<"on" | "off">("off"); // toggle for timer countdown.
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
        const secondsToSubtract = Math.floor(
          accumulatedTime.current / interval,
        );
        dispatch({ payload: secondsToSubtract, type: "updateTimer" });
        accumulatedTime.current %= interval; // Keep the remainder for the next update
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
      case "off": {
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
