import { auth, db } from "../../../main";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getTasksFromFirebase() {
  const user = auth.currentUser;
  if (!user) return;

  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
  const tasksSnapshot = await getDocs(
    query(tasksCollectionRef, orderBy("date")),
  );

  const tasks = tasksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return tasks;
}
