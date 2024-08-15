import { SubTaskType } from "./TaskExpanded";

export function isSubTaskType(obj: unknown): obj is SubTaskType {
  if (typeof obj !== "object" || obj === null || obj === undefined) {
    return false;
  }

  const { title, completed, position, id } = obj as Partial<SubTaskType>;

  return (
    typeof title === "string" &&
    typeof completed === "boolean" &&
    typeof position === "number" &&
    typeof id === "string"
  );
}
