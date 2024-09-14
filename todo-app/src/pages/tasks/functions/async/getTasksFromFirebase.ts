import { TaskType } from "@/pages/tasks/components/Task";
import { auth, db } from "@/main";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { convertRawTaskToClientTask } from "../client/convertRawTaskToClientTask";

export type RawSubTaskType = {
  completed: boolean;
  position: number;
};

export type RawTaskType = {
  authorID: string;
  id: string;
  status: "draft" | "in-progress" | "complete";
  dueDate: number | null;
  title: string;
  description?: string;
  // subTask titles are being used as unique IDs in firebase (the string in Record).
  subTasks: Record<string, RawSubTaskType>;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export async function getTasksFromFirebase() {
  const user = auth.currentUser;

  // user may not exist on page load. Throwing causes useQuery to retry in 500ms.
  if (!user) throw new Error("no user state");

  const tasksCollectionRef = collection(db, "users", user.uid, "tasks");

  let tasksSnapshot;
  try {
    tasksSnapshot = await getDocs(
      query(tasksCollectionRef, orderBy("updatedAt", "desc")),
    );
  } catch (error) {
    throw new Error(`Failed to load tasks, check internet and try again.`);
  }

  const temp = tasksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RawTaskType[];

  const tasks: TaskType[] = temp.map((rawTask) =>
    convertRawTaskToClientTask(rawTask),
  );

  return tasks;
}
