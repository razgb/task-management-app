import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addSubTaskToFirebase } from "../../pages/tasks/features/addSubTaskToFirebase";
import { removeSubTaskFromFirebase } from "../../pages/tasks/features/removeSubTaskFromFirebase";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import { useLoading } from "../../stores/loading/useLoading";
import useModal from "../../stores/modal/useModal";
import useRouter from "../../stores/router/useRouter";
import useTaskExpanded from "../../stores/taskExpanded/useTaskExpanded";
import { checkInputTextValidity } from "../../util/checkInputTextValidity";
import Button from "../shared/Button";
import SubTaskList from "./sub-components/SubTaskList";
import TaskDetails from "./sub-components/TaskDetails";
import ToDoItem from "./sub-components/TodoItem";
import { handleSubTaskAdd } from "./functions/handleSubtaskAdd";
import { handleSubTaskRemove } from "./functions/handleSubtaskDeletion";
import { BadgeX } from "lucide-react";

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
  const { updatePath } = useRouter();
  const { currentTask } = useTaskExpanded();
  const { addToLoadingQueue, removeFromLoadingQueue } = useLoading();
  const { openModal } = useModal();
  const [subTasks, setSubTasks] = useState<SubTaskType[]>(
    currentTask ? currentTask.subtasks : [],
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async ({ type, taskID, subTask }: MutationParametersType) => {
      if (!currentTask) return;

      if (type === "add-sub-task") {
        await handleSubTaskAdd({
          subTasks,
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
          subTasks,
          subTask,
          addToLoadingQueue,
          removeFromLoadingQueue,
          removeSubTaskFromFirebase,
          removeSubTaskOnClient,
          taskID,
        });
      } else if (type === "delete-task") {
        // await placeholder
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
        `Error syncing subtasks, check internet connection and try again.`,
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries(["tasks"]); // passive invalidation (not direct).
    },
  });

  function addSubTaskOnClient(title: string) {
    if (!currentTask) return; // ts complains...
    if (!checkInputTextValidity(title)) {
      openModal("error", "Invalid text, please try again.");
    }

    setSubTasks((prev) => {
      const newSubTasksState = [
        ...prev,
        {
          position: prev.length || 0,
          title: title,
          completed: false,
        },
      ];

      return newSubTasksState;
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeSubTaskOnClient(subTask: SubTaskType) {
    if (!currentTask) return;

    setSubTasks((prev) => {
      const newSubTasksState = prev
        .filter((st) => st.title !== subTask.title)
        .map((st) => {
          if (st.position < subTask.position) return st;

          return {
            ...st,
            position: st.position - 1,
          };
        });

      return newSubTasksState;
    });
  }

  function swapSubTaskPositions(
    incomingTaskTitle: string,
    outgoingTaskTitle: string,
  ) {
    if (!currentTask) return;

    setSubTasks((prev) => {
      let incomingTaskPosition: number | undefined = undefined;
      let outgoingTaskPosition: number | undefined = undefined;

      prev.forEach((subTask) => {
        const title = subTask.title;
        if (incomingTaskPosition && outgoingTaskPosition) return;

        if (title === incomingTaskTitle) {
          incomingTaskPosition = subTask.position;
        } else if (title === outgoingTaskTitle) {
          outgoingTaskPosition = subTask.position;
        }
      });

      const newSubTasksArray = prev.map((task) => {
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

      return newSubTasksArray;
    });
  }

  const reorderedTaskList: JSX.Element[] = [];
  for (let i = 0; i < subTasks.length; i++) {
    if (reorderedTaskList.length === subTasks.length) {
      break;
    }

    for (let j = 0; j < subTasks.length; j++) {
      const subTask = subTasks[j];
      if (subTask.position !== i) continue;

      reorderedTaskList.push(
        <ToDoItem
          key={subTask.title}
          subTask={subTask}
          swapSubTaskPositions={swapSubTaskPositions}
          onDelete={async () => {
            if (!currentTask) return;
            await mutateAsync({
              taskID: currentTask.id,
              type: "delete-sub-task",
              subTask: subTask,
            });
          }}
        />,
      );
    }
  }

  useEffect(() => {
    // if (!currentTask) updatePath("/error");
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
                position: subTasks.length,
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
