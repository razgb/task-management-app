import { TaskType } from "../../../components/dashboard/Task";
import { auth, db } from "../../../main";
import { collection, getDocs, query } from "firebase/firestore";

export async function getTasksFromFirebase() {
  const user = auth.currentUser;
  if (!user) throw new Error("no user state"); // easy solve.
  // if (!user) return;

  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
  const tasksSnapshot = await getDocs(query(tasksCollectionRef));

  const tasks = tasksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return tasks as Omit<TaskType, "hideGrabIcon">[];
}
