import { useEffect, useRef, useState } from "react";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import Button from "../shared/Button";
import ProgressBar from "../shared/ProgressBar";
import ToDoItem from "./TodoItem";
import { checkInputTextValidity } from "../../util/checkInputTextValidity";
import useTaskExpanded from "../../stores/taskExpanded/useTaskExpanded";
import useRouter from "../../stores/router/useRouter";
import { AlertTriangleIcon } from "lucide-react";
import { useLoading } from "../../stores/loading/useLoading";
import { useMutation, useQueryClient } from "react-query";
import { addSubTaskToFirebase } from "../../pages/tasks/features/addSubTaskToFirebase";
import { removeSubTaskFromFirebase } from "../../pages/tasks/features/removeSubTaskFromFirebase";
import useModal from "../../stores/modal/useModal";

export type SubTaskType = {
  title: string;
  completed: boolean;
  position: number;
};

type MutationParametersType = {
  type: "add" | "remove";
  taskID: string; // currentTask.id
  subtask: SubTaskType;
};

export default function TaskExpanded() {
  const { accessibility } = useAccessibility();
  const {
    reduceAnimations,
    removeRoundEdges,
    increaseLetterSpacing,
    highContrastMode,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;
  const queryClient = useQueryClient();
  const { updatePath } = useRouter();
  const { currentTask } = useTaskExpanded();
  const { addToLoadingQueue, removeFromLoadingQueue } = useLoading();
  const { openModal } = useModal();

  const subtaskData = currentTask ? currentTask.subtasks : [];
  const [subTasks, setSubTasks] = useState<SubTaskType[]>(subtaskData);

  const buttonRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async ({ type, taskID, subtask }: MutationParametersType) => {
      if (!currentTask) return;
      let promise: (() => Promise<void>) | null = null;

      if (type === "add") {
        // addSubTaskOnClient(subtask.title);
        promise = async () => await addSubTaskToFirebase(taskID, subtask);
      } else if (type === "remove") {
        // removeSubTaskOnClient(subtask.title);
        promise = async () => await removeSubTaskFromFirebase(taskID, subtask);
      }
      if (!promise) return;

      addToLoadingQueue("task-details");
      try {
        // await new Promise((_, reject) => setTimeout(reject, 1000)); // testing failures.
        await promise();
        addSubTaskOnClient(subtask.title); // remove this if you reattempt optimistic updates.
      } catch (err) {
        removeFromLoadingQueue("task-details");
        throw err;
      } finally {
        removeFromLoadingQueue("task-details");
      }
    },
    retry: 2,
    onError: () => {
      openModal(
        "error",
        `Error syncing subtasks, check internet connection and try again.`,
      );
    },
    onSuccess: () => {
      // passively invalidate TasksPage data (non-instant network request).
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  function addSubTaskOnClient(title: string) {
    if (!currentTask) return;
    if (!checkInputTextValidity(title)) return; // Proper error messages in later update.
    let subtaskPosition: number | null = null;

    setSubTasks((prev) => {
      subtaskPosition = prev.length;
      return [
        ...prev,
        {
          position: subtaskPosition,
          title: title,
          completed: false,
        },
      ];
    });
  }

  function removeSubTaskOnClient(title: string) {
    setSubTasks((prev) => {
      return prev.filter((subtask) => subtask.title !== title);
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
        const id = subTask.title;
        if (incomingTaskPosition && outgoingTaskPosition) return;

        if (id === incomingTaskTitle) {
          incomingTaskPosition = subTask.position;
        } else if (id === outgoingTaskTitle) {
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
    for (let j = 0; j < subTasks.length; j++) {
      const task = subTasks[j];
      if (task?.position !== i) continue;

      reorderedTaskList.push(
        <ToDoItem
          key={task.title}
          task={task}
          swapSubTaskPositions={swapSubTaskPositions}
        />,
      );
    }
  }

  useEffect(() => {
    if (!currentTask) updatePath("/error");
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
        <div className="mb-2 flex h-full max-h-8 gap-4">
          <div
            style={{
              borderRadius: removeRoundEdges ? "0" : "",
            }}
            className="flex w-full max-w-[150px] items-center gap-1 rounded-xl bg-secondary-100 px-2 py-1"
          >
            <ProgressBar completion={50} width={1} />
            <p
              style={{
                fontSize: `${fontSizeMap.sm}px`,
                color: highContrastMode ? accessibilityTextColor : "",
              }}
              className="flex-shrink-0 font-light"
            >
              50%
            </p>
          </div>

          <div
            style={{
              borderRadius: removeRoundEdges ? "0" : "",
            }}
            className="flex items-center rounded-xl bg-secondary-100 p-2"
          >
            <p
              style={{
                fontSize: `${fontSizeMap.sm}px`,
                color: highContrastMode ? accessibilityTextColor : "",
              }}
              className="text-sm font-light"
            >
              Last edited: 30-07-2024
            </p>
          </div>
        </div>

        <h1
          style={{
            fontSize: `${fontSizeMap["3xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.2rem" : "",
          }}
          className="text-3xl font-bold capitalize"
        >
          {currentTask?.title}
        </h1>

        <p
          style={{
            fontSize: `${fontSizeMap["lg"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
          }}
          className="mb-4 max-w-[75ch] text-lg text-textWeak"
        >
          {currentTask?.description}
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault(); // Prevent default form submission
            if (!buttonRef.current || !currentTask) return;

            await mutateAsync({
              taskID: currentTask.id,
              type: "add",
              subtask: {
                position: subTasks.length,
                title: buttonRef.current.value,
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
            ref={buttonRef}
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
        <div
          style={{
            borderRadius: removeRoundEdges ? "0" : "",
          }}
          className="h-1/2 flex-1 rounded-2xl border-4 border-secondary-300 py-4 pl-4"
        >
          <ul className="flex h-full flex-col gap-2 overflow-y-scroll pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
            {subTasks.length ? (
              reorderedTaskList
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex max-w-[300px] flex-col items-center">
                  <AlertTriangleIcon size={64} />
                  <h3
                    style={{
                      fontSize: fontSizeMap["2xl"],
                    }}
                    className=""
                  >
                    No sub tasks
                  </h3>
                  <p className="text-center text-textWeak">
                    You'll see your sub tasks here upon adding one in the form
                    above!
                  </p>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
