import { addSubTaskToFirebase } from "../async/addSubTaskToFirebase";
import { SubTaskType } from "@/pages/tasks/components/TaskExpanded";

type HandleSubTaskAddProps = {
  taskID: string;
  subTasks: SubTaskType[];
  subTask: SubTaskType;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  addSubTaskToFirebase: typeof addSubTaskToFirebase;
  addSubTaskOnClient: (title: string) => void;
  openModal: (type: "success" | "error", message: string) => void;
};

export async function handleSubTaskAdd({
  subTasks,
  subTask,
  openModal,
  addToLoadingQueue,
  removeFromLoadingQueue,
  addSubTaskToFirebase,
  addSubTaskOnClient,
  taskID,
}: HandleSubTaskAddProps) {
  const titleAlreadyExists = subTasks.some((st) => st.title === subTask.title);

  if (titleAlreadyExists) {
    openModal("error", "This sub task already exists.");
    return;
  }

  addToLoadingQueue("task-details");

  try {
    await addSubTaskToFirebase(taskID, subTask); // react-query onError function handles err.
  } catch (_) {
    throw new Error(`Error adding sub task called "${subTask.title}".`);
  } finally {
    removeFromLoadingQueue("task-details");
  }

  addSubTaskOnClient(subTask.title);
}
