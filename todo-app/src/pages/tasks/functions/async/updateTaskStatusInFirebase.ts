import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "@/main";
import { TaskType } from "@/pages/tasks/components/Task";

export async function updateTaskStatusInFirebase(
  taskID: string,
  newStatus: TaskType["status"],
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");
  // console.log(taskID, newStatus);

  const taskDocRef = doc(db, "users", user.uid, "tasks", taskID);

  await updateDoc(taskDocRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
}
