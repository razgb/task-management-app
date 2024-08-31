import { doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../main";
import { SubTaskType } from "../../../components/tasks-page/TaskExpanded";
import { updateDoc } from "firebase/firestore";

export async function addSubTaskToFirebase(
  taskID: string,
  subTask: SubTaskType,
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = doc(db, "users", user.uid, "tasks", taskID);

  const firebaseSubtask = {
    completed: subTask.completed,
    position: subTask.position,
  };

  try {
    await updateDoc(tasksCollectionRef, {
      [`subTasks.${subTask.title}`]: firebaseSubtask,
      updatedAt: serverTimestamp(),
    });
  } catch (_) {
    throw new Error("Error adding sub task to our servers, please try again.");
  }
}
