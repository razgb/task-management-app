import { ReducerActionType, ReducerStateType } from "./TimerContextProvider";

const DEFAULT_TIMER_STATE: ReducerStateType = {
  timerValue: 25 * 60, // 25 minutes in seconds
  timerState: "off",
  timerSettings: {
    breakDuration: 5 * 60, // 5 minutes in seconds
    workDuration: 25 * 60, // 25 minutes in seconds
    autoSwitch: true,
  },
};

function getStoredTimerState(): ReducerStateType {
  const storedTimerStateJSON = localStorage.getItem("timerSettings");
  if (!storedTimerStateJSON) return DEFAULT_TIMER_STATE;

  try {
    return JSON.parse(storedTimerStateJSON) as ReducerStateType;
  } catch (error) {
    console.error("Failed to parse timer settings from localStorage:", error);
    return DEFAULT_TIMER_STATE;
  }
}

export const defaultTimerState: ReducerStateType = getStoredTimerState();

export default function reducer(
  state: ReducerStateType,
  action: ReducerActionType,
): ReducerStateType {
  const payload = action.payload;

  switch (action.type) {
    case "updateTimer": {
      if (state.timerValue === 0 || typeof payload !== "number" || null) {
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

      const newState = {
        ...state,
        timerValue: payload.timerSettings?.workDuration || state.timerValue,
        timerSettings: {
          ...state.timerSettings,
          ...payload.timerSettings,
        },
      };

      localStorage.setItem("timerSettings", JSON.stringify(newState));
      return newState;
    }

    default:
      console.warn(
        "Seems to be an error, default switch case reached inside the timer context.",
      );

      return state;
  }
}
