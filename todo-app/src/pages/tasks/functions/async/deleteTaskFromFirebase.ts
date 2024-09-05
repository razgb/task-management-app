import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/main";

export async function deleteTaskFromFirebase(taskID: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = doc(db, "users", user.uid, "tasks", taskID);

  try {
    await deleteDoc(tasksCollectionRef);
  } catch (error) {
    throw new Error("Error deleting your task, please try again: ");
  }
}
