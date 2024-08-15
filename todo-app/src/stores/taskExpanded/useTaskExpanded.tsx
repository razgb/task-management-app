import { useContext } from "react";
import TaskExpandedContext from "./TaskExpandedContext";

export default function useTaskExpanded() {
  const taskExpandedContext = useContext(TaskExpandedContext);
  if (!TaskExpandedContext)
    throw new Error("Wrap component around task expanded context provider.");

  return taskExpandedContext;
}
