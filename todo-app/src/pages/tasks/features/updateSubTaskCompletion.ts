import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { TaskType } from "../../../components/dashboard/Task";
import { SubTaskType } from "../../../components/tasks-page/TaskExpanded";
import { db, auth } from "../../../main";
import { RawSubTaskType } from "./getTasksFromFirebase";

export async function updateSubTaskCompletion(
  newCurrentTask: TaskType,
  subTask: SubTaskType,
) {
  if (!auth.currentUser) {
    throw new Error(
      "User doesn't exist. Cannot perform subTask completion update.",
    );
  }

  const tasksCollectionRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "tasks",
    newCurrentTask.id,
  );

  const rawSubTasks: Record<string, RawSubTaskType> = {};

  newCurrentTask.subTasks.forEach((st) => {
    rawSubTasks[st.title] = {
      position: st.position,
      completed: st.completed,
    };
  });

  try {
    await updateDoc(tasksCollectionRef, {
      subTasks: rawSubTasks,
      updatedAt: serverTimestamp(),
    });
  } catch (_) {
    throw new Error(
      `Error syncing your sub task called "${subTask.title}". Check internet connection and try again.`,
    );
  }
}
