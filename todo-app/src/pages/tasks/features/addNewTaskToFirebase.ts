import { collection, addDoc } from "firebase/firestore";
import { TaskType } from "../../../components/dashboard/Task";
import { auth, db } from "../../../main";

// use this for the task adding page.
export async function addNewTaskToFirebase(task: TaskType) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");

  try {
    await addDoc(tasksCollectionRef, task);
  } catch (error) {
    console.error("Error uploading your task, please try again: ", error);
    throw error;
  }
}
