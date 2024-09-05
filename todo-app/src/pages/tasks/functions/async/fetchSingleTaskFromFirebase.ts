import { doc, getDoc } from "firebase/firestore";
import { TaskType } from "@/pages/tasks/components/Task";
import { auth, db } from "@/main";
import { RawTaskType } from "./getTasksFromFirebase";
import { convertRawTaskToClientTask } from "../client/convertRawTaskToClientTask";

export async function fetchSingleTaskFromFirebase(taskID: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist."); // tries again
  if (!taskID) throw new Error("Task ID doesn't exist.");

  const taskRef = doc(db, "users", user.uid, "tasks", taskID);

  try {
    const taskSnapshot = await getDoc(taskRef);
    // console.log(taskSnapshot);
    if (!taskSnapshot.exists()) throw new Error("Task does not exist."); // 404

    const rawTask = taskSnapshot.data() as RawTaskType;
    const task = convertRawTaskToClientTask(rawTask) as TaskType;

    return task;
  } catch (_) {
    throw new Error("Error getting task data"); // reroute back to tasks page
  }
}
