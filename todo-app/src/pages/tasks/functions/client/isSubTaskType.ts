import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";

export function isSubTaskType(obj: unknown): obj is SubTaskType {
  if (typeof obj !== "object" || obj === null || obj === undefined) {
    return false;
  }

  const { title, completed, position } = obj as Partial<SubTaskType>;
  return (
    typeof title === "string" &&
    typeof completed === "boolean" &&
    typeof position === "number"
  );
}
