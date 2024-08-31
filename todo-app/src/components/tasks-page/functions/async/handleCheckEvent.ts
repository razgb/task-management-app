import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../main";
import { TaskType } from "../../../dashboard/Task";
import { SubTaskType } from "../../TaskExpanded";

// DO NOT USE THIS YET, NEED ENTIRE APP RESTRUCTURE....
export async function handleCheckEvents(
  taskID: string,
  checkValue: boolean,
  currentTask: TaskType,
  subTasks: SubTaskType[],
  subTask: SubTaskType,
  toggleCheckOnClient: (check: boolean) => void,
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = doc(db, "users", user.uid, "tasks", taskID);

  try {
    await updateDoc(tasksCollectionRef, {
      ...currentTask,
      subtasks: [...subTasks, subTask],
    });
  } catch (error) {
    console.error("Error uploading your task, please try again: ", error);
    throw error;
  }
}
