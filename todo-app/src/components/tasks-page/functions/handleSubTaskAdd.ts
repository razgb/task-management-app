import { SubTaskType } from "../TaskExpanded";

type HandleSubTaskAddProps = {
  taskID: string;
  subTasks: SubTaskType[];
  subTask: SubTaskType;
  addToLoadingQueue: (key: string) => void;
  removeFromLoadingQueue: (key: string) => void;
  addSubTaskToFirebase: (taskID: string, subTask: SubTaskType) => Promise<void>;
  addSubTaskOnClient: (title: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  openModal: (type: "success" | "error", message: string) => void;
};

export async function handleSubTaskAdd({
  subTasks,
  subTask,
  openModal,
  inputRef,
  addToLoadingQueue,
  removeFromLoadingQueue,
  addSubTaskToFirebase,
  addSubTaskOnClient,
  taskID,
}: HandleSubTaskAddProps) {
  const titleAlreadyExists = subTasks.some((st) => st.title === subTask.title);

  if (titleAlreadyExists) {
    openModal("error", "This subtask already exists.");
    if (inputRef.current) inputRef.current.value = "";
    return;
  }

  addToLoadingQueue("task-details");

  await addSubTaskToFirebase(taskID, subTask); // react-query onError function handles err.
  addSubTaskOnClient(subTask.title);

  removeFromLoadingQueue("task-details");
}
