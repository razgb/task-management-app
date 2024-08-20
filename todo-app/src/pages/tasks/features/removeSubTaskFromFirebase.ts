import { arrayRemove, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../main";
import { SubTaskType } from "../../../components/tasks-page/TaskExpanded";
import { updateDoc } from "firebase/firestore";

export async function removeSubTaskFromFirebase(
  taskID: string,
  subtask: SubTaskType,
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = doc(db, "users", user.uid, "tasks", taskID);

  try {
    await updateDoc(tasksCollectionRef, {
      subtasks: arrayRemove(subtask),
      lastEdited: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating your task status, please try again: ", error);
    throw error;
  }
}
