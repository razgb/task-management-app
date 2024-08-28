import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../main";
import { SubTaskType } from "../../../components/tasks-page/TaskExpanded";
import { updateDoc } from "firebase/firestore";
import { TaskType } from "../../../components/dashboard/Task";

export async function removeSubTaskFromFirebase(
  taskID: string,
  subTask: SubTaskType,
) {
  const user = auth.currentUser;
  if (!user) throw new Error("Firebase user doesn't exist.");

  const tasksCollectionRef = doc(db, "users", user.uid, "tasks", taskID);
  const docSnap = await getDoc(tasksCollectionRef);

  // console.log(taskID, subTask.title);

  if (docSnap.exists()) {
    const data = docSnap.data() as TaskType;
    const updatedSubtasks = data.subtasks
      .filter((st: SubTaskType) => st.title !== subTask.title)
      .map((st) => {
        if (st.position < subTask.position) return st;
        return {
          ...st,
          position: st.position - 1,
        };
      });

    await updateDoc(tasksCollectionRef, {
      subtasks: updatedSubtasks,
      lastEdited: serverTimestamp(),
    });
  } else
    throw new Error(
      "There seems to be an error with syncing your subtasks. Please try again.",
    );
}
