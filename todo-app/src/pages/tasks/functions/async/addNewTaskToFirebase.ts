import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/main";
import { TaskFormState } from "@/pages/task-creator/functions/client/reducer";

export async function addNewTaskToFirebase(taskFormData: TaskFormState) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");

  const { dueDate } = taskFormData;
  const dateObject = new Date(dueDate);
  const unixTimestamp = dateObject.getTime().toString();

  try {
    await addDoc(tasksCollectionRef, {
      ...taskFormData,
      status: "draft",
      authorID: user.uid,
      dueDate: unixTimestamp,
      subTasks: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(`Error uploading your task, please try again.`);
  }
}
