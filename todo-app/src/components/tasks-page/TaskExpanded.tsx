import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addSubTaskToFirebase } from "../../pages/tasks/features/addSubTaskToFirebase";
import { removeSubTaskFromFirebase } from "../../pages/tasks/features/removeSubTaskFromFirebase";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import { useLoading } from "../../stores/loading/useLoading";
import useModal from "../../stores/modal/useModal";
// import useRouter from "../../stores/router/useRouter";
import useTaskExpanded from "../../stores/taskExpanded/useTaskExpanded";
import { checkInputTextValidity } from "../../util/checkInputTextValidity";
import Button from "../shared/Button";
import SubTaskList from "./sub-components/SubTaskList";
import TaskDetails from "./sub-components/TaskDetails";
import { handleSubTaskAdd } from "./functions/async/handleSubTaskAdd";
import { handleSubTaskRemove } from "./functions/async/handleSubTaskRemove";
import { BadgeX } from "lucide-react";
import { reorderSubtasks } from "./functions/client/reorderSubtasks";
import { TaskType } from "../dashboard/Task";

export type SubTaskType = {
  title: string;
  completed: boolean;
  position: number;
};

type MutationParametersType = {
  type: "add-sub-task" | "delete-sub-task" | "delete-task";
  taskID: string; // currentTask.id
  subTask: SubTaskType;
};

export default function TaskExpanded() {
  const { accessibility } = useAccessibility();
  const {
    removeRoundEdges,
    highContrastMode,
    fontSizeMap,
    increaseLetterSpacing,
    accessibilityTextColor,
    reduceAnimations,
  } = accessibility;
  const queryClient = useQueryClient();
  // const { updatePath } = useRouter();
  const { currentTask, updateCurrentTask } = useTaskExpanded();
  const { addToLoadingQueue, removeFromLoadingQueue } = useLoading();
  const { openModal } = useModal();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const localCurrentTask =
    currentTask ||
    ({
      authorID: "",
      id: "",
      title: "",
      description: "",
      dueDate: "",
      status: "draft",
      createdAt: {
        seconds: 0,
        nanoseconds: 0,
      },
      updatedAt: {
        seconds: 0,
        nanoseconds: 0,
      },
      subTasks: [],
    } as TaskType);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async ({ type, taskID, subTask }: MutationParametersType) => {
      if (type === "add-sub-task") {
        await handleSubTaskAdd({
          subTasks: localCurrentTask.subTasks,
          subTask,
          openModal,
          inputRef,
          addToLoadingQueue,
          removeFromLoadingQueue,
          addSubTaskToFirebase,
          addSubTaskOnClient,
          taskID,
        });
      } else if (type === "delete-sub-task") {
        await handleSubTaskRemove({
          subTasks: localCurrentTask.subTasks,
          subTask,
          addToLoadingQueue,
          removeFromLoadingQueue,
          removeSubTaskFromFirebase,
          removeSubTaskOnClient,
          taskID,
        });
      } else if (type === "delete-task") {
        // redirect use to /taks-page
      }
    },
    retry: 2,
    onError: (err) => {
      // proof-read this.
      if (err instanceof Error) {
        // thrown from the handle functions.
        openModal("error", err.message);
        return;
      }

      openModal(
        "error",
        `Error syncing subTasks, check internet connection and try again.`,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]); // passive invalidation (not direct).
    },
  });

  function addSubTaskOnClient(title: string) {
    if (!localCurrentTask) return;
    if (!checkInputTextValidity(title)) {
      openModal("error", "Invalid text, please try again.");
    }

    const newSubTasksState = [
      ...localCurrentTask.subTasks,
      {
        position: localCurrentTask.subTasks.length || 0,
        title: title,
        completed: false,
      },
    ];

    updateCurrentTask({
      ...localCurrentTask,
      subTasks: newSubTasksState,
      updatedAt: {
        seconds: new Date().getTime() / 1000,
        nanoseconds: 0,
      },
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeSubTaskOnClient(subTask: SubTaskType) {
    if (!localCurrentTask) return;

    const newSubTasksState = localCurrentTask.subTasks
      .filter((st) => st.title !== subTask.title)
      .map((st) => {
        if (st.position < subTask.position) return st;

        return {
          ...st,
          position: st.position - 1,
        };
      });

    updateCurrentTask({
      ...localCurrentTask,
      subTasks: newSubTasksState,
      updatedAt: {
        seconds: new Date().getTime() / 1000,
        nanoseconds: 0,
      },
    });
  }

  function swapSubTaskPositions(
    incomingTaskTitle: string,
    outgoingTaskTitle: string,
  ) {
    if (!localCurrentTask) return;

    let incomingTaskPosition: number | undefined = undefined;
    let outgoingTaskPosition: number | undefined = undefined;

    localCurrentTask.subTasks.forEach((subTask) => {
      const title = subTask.title;
      if (incomingTaskPosition && outgoingTaskPosition) return;

      if (title === incomingTaskTitle) {
        incomingTaskPosition = subTask.position;
      } else if (title === outgoingTaskTitle) {
        outgoingTaskPosition = subTask.position;
      }
    });

    const newSubTasksArray = localCurrentTask.subTasks.map((task) => {
      const title = task.title;
      if (title !== incomingTaskTitle && title !== outgoingTaskTitle)
        return task;

      return {
        ...task,
        position:
          title === incomingTaskTitle
            ? outgoingTaskPosition
            : incomingTaskPosition,
      } as SubTaskType;
    });

    updateCurrentTask({
      ...localCurrentTask,
      subTasks: newSubTasksArray,
      updatedAt: {
        seconds: new Date().getTime() / 1000,
        nanoseconds: 0,
      },
    });
  }

  async function removalMutation(subTask: SubTaskType) {
    if (!currentTask) return;

    await mutateAsync({
      taskID: currentTask.id,
      type: "delete-sub-task",
      subTask: subTask,
    });
  }

  const reorderedTaskList = reorderSubtasks({
    currentTask: localCurrentTask,
    removalMutation,
    swapSubTaskPositions,
  });

  useEffect(() => {
    // if (!localCurrentTask) updatePath("/error");
  });

  return (
    <div
      style={{
        transition: reduceAnimations ? "none" : "",
        borderRadius: removeRoundEdges ? "0" : "",
        letterSpacing: increaseLetterSpacing ? "0.1rem" : "0",
      }}
      className="h-full overflow-hidden rounded-2xl bg-primaryBg px-6 py-12"
    >
      <div className="mx-auto flex h-full w-full max-w-[800px] flex-1 flex-col gap-2">
        <div className="mb-8 flex items-start justify-between gap-4">
          <TaskDetails />
          <Button variant="contrast-icon-text">
            <BadgeX></BadgeX>
            <span>Delete task</span>
          </Button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault(); // Prevent default form submission
            if (!inputRef.current || !currentTask) return;

            await mutateAsync({
              taskID: currentTask.id,
              type: "add-sub-task",
              subTask: {
                position: currentTask.subTasks.length,
                title: inputRef.current.value,
                completed: false,
              },
            });
          }}
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
            transition: reduceAnimations ? "none" : "",
          }}
          className="m-0 flex max-w-[500px] items-center gap-1 rounded-full bg-secondary-200 transition-colors hover:bg-secondary-300"
        >
          <input
            className="h-full w-full rounded-xl bg-transparent px-3 py-1 outline-none placeholder:text-textPlaceholder"
            type="text"
            placeholder="Add a sub task"
            ref={inputRef}
            style={{
              fontSize: `${fontSizeMap.sm}px`,
              color: highContrastMode ? accessibilityTextColor : "",
            }}
          />

          <Button
            style={{ fontSize: `${fontSizeMap.sm}px` }}
            type="submit"
            variant="contrast-default"
            disabled={isLoading}
          >
            Add
          </Button>
        </form>

        {/* Subtasks List */}
        <SubTaskList taskList={reorderedTaskList} />
      </div>
    </div>
  );
}
