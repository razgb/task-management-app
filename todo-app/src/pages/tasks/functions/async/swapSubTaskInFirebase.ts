import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { TaskType } from "@/pages/tasks/components/Task";
import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";
import { db, auth } from "@/main";
import { convertClientTaskToRawTask } from "../client/convertClientTaskToRawTask";

export async function swapSubTaskInFirebase(
  newCurrentTask: TaskType,
  subTask: SubTaskType,
) {
  if (!auth.currentUser) {
    throw new Error(
      "User doesn't exist. Cannot perform subTask completion update.",
    );
  }

  const taskCollectionRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "tasks",
    newCurrentTask.id,
  );

  const task = convertClientTaskToRawTask(newCurrentTask);

  try {
    await updateDoc(taskCollectionRef, {
      ...task,
      updatedAt: serverTimestamp(),
    });
  } catch (_) {
    throw new Error(
      `Error syncing your sub task called "${subTask.title}". Check internet connection and try again.`,
    );
  }
}
