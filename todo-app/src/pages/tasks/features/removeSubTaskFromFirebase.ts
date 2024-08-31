import { doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../main";
import { SubTaskType } from "../../../components/tasks-page/TaskExpanded";
import { updateDoc } from "firebase/firestore";
import { RawSubTaskType } from "./getTasksFromFirebase";

/**
 * Filters out subtask to be deleted.
 * Adjusts the rest of the positions.
 * Updates firebase timestamp object.
 *
 * @throws {Error} If the Firebase user does not exist or on fetching error.
 */
export async function removeSubTaskFromFirebase(
  taskID: string,
  subTask: SubTaskType,
  subTasks: SubTaskType[],
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const updatedSubtasksArray = subTasks
    .filter((st: SubTaskType) => st.title !== subTask.title)
    .map((st) => {
      if (st.position < subTask.position) return st;
      return {
        ...st,
        position: st.position - 1,
      };
    });

  const updatedSubtasksMap: Record<string, RawSubTaskType> = {};

  updatedSubtasksArray.forEach((st) => {
    updatedSubtasksMap[st.title] = {
      position: st.position,
      completed: st.completed,
    };
  });

  const tasksCollectionRef = doc(db, "users", user.uid, "tasks", taskID);

  try {
    await updateDoc(tasksCollectionRef, {
      subTasks: updatedSubtasksMap,
      updatedAt: serverTimestamp(),
    });
  } catch (_) {
    throw new Error(
      `Error deleting sub task called "${subTask.title}". Check internet connection and try again.`,
    );
  }
}
