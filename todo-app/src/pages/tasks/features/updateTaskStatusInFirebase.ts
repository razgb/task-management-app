import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../main";
import { TaskType } from "../../../components/dashboard/Task";

export async function updateTaskStatusInFirebase(
  taskID: string,
  newStatus: TaskType["status"],
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");
  console.log(taskID, newStatus);

  const taskDocRef = doc(db, "users", user.uid, "tasks", taskID);

  try {
    await updateDoc(taskDocRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    console.log("updated");
  } catch (error) {
    // temp needs to be an error by value.
    console.error(
      "Error uploading your task, check internet connection and try again.",
    );
    throw error;
  }
}
