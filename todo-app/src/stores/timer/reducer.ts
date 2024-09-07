import { ReducerActionType, ReducerStateType } from "./TimerContext";

const DEFAULT_TIMER_STATE: ReducerStateType = {
  timerValue: 25 * 60,
  timerMode: "work",
  timerState: "off",
  timerSettings: {
    workDuration: 25 * 60, // 25 minutes in seconds
    breakDuration: 5 * 60, // 5 minutes in seconds
    autoSwitch: true,
  },
};

function getLocalStorageTimerSettings(): ReducerStateType {
  const storedTimerStateJSON = localStorage.getItem("timerSettings");
  if (!storedTimerStateJSON) return DEFAULT_TIMER_STATE;

  try {
    return JSON.parse(storedTimerStateJSON) as ReducerStateType;
  } catch (error) {
    console.error("Failed to parse timer settings from localStorage:", error);
    return DEFAULT_TIMER_STATE;
  }
}
export let defaultTimerState: ReducerStateType = getLocalStorageTimerSettings();

export default function reducer(
  state: ReducerStateType,
  action: ReducerActionType,
): ReducerStateType {
  const payload = action.payload;

  switch (action.type) {
    case "updateTimer": {
      if (typeof payload !== "number") {
        console.warn(
          "Invalid payload for updateTimer action - not a number",
          `Payload: ${payload}`,
        );
        return defaultTimerState;
      }

      if (state.timerValue > 0) {
        return {
          ...state,
          timerValue: state.timerValue - payload, // accumalated seconds.
        };
      }

      if (state.timerSettings.autoSwitch === true && state.timerValue <= 0) {
        if (state.timerMode === "work") {
          return {
            ...state,
            timerMode: "break",
            timerValue: state.timerSettings.breakDuration,
          };
        } else if (state.timerMode === "break") {
          return {
            ...state,
            timerMode: "work",
            timerValue: state.timerSettings.workDuration,
          };
        }
      }

      // Turn off timer since payload === 0.
      return {
        ...defaultTimerState,
      };
    }

    case "toggleMode": {
      if (state.timerMode === "work") {
        return {
          ...defaultTimerState,
          timerValue: state.timerSettings.breakDuration,
          timerMode: "break",
        };
      } else if (state.timerMode === "break") {
        return {
          ...defaultTimerState,
          timerValue: state.timerSettings.workDuration,
          timerMode: "work",
        };
      } else {
        return {
          ...defaultTimerState,
          timerValue: state.timerSettings.workDuration,
          timerMode: "work",
        };
      }
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
        ...defaultTimerState,
        timerValue: payload.timerSettings?.workDuration || state.timerValue,
        timerSettings: {
          ...state.timerSettings,
          ...payload.timerSettings,
        },
      };

      localStorage.setItem("timerSettings", JSON.stringify(newState));
      defaultTimerState = newState;
      return newState;
    }

    case "addTime": {
      if (
        typeof payload !== "number" ||
        (payload <= 0 && state.timerValue <= Math.abs(payload))
      ) {
        return defaultTimerState;
      }

      // Timer limiter to prevent overflow and abuse.
      if (state.timerValue + payload >= 3600) {
        return {
          ...state,
          timerValue: 3600,
        };
      }

      return {
        ...state,
        timerValue: state.timerValue + payload, // payload sign set in dispatching function in TimerPage buttons.
      };
    }

    default:
      console.warn(
        "Seems to be an error, default switch case reached inside the timer context.",
      );

      return state;
  }
}
