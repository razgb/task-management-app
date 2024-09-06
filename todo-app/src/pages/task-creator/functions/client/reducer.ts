import { checkWordsAgainstLimit } from "./checkWordsAgainstLimit";

export type TaskFormState = {
  title: string;
  dueDate: string; // unix string timestamp
  description: string;
};

type TaskFormAction = {
  type: "setTitle" | "setDueDate" | "setDescription";
  payload: string;
};

export function reducer(state: TaskFormState, action: TaskFormAction) {
  const { type, payload } = action;

  switch (type) {
    case "setTitle":
      // assuming each word is max 26 chars and 10 spaces between each. (prevents abuse)
      if (!checkWordsAgainstLimit(payload, 10) || payload.length > 270) {
        return state;
      }

      return { ...state, title: payload };

    case "setDueDate": {
      return {
        ...state,
        dueDate: payload,
      };
    }

    case "setDescription":
      if (!checkWordsAgainstLimit(payload, 30) || payload.length > 780) {
        return state;
      }

      return { ...state, description: action.payload };
  }
}
