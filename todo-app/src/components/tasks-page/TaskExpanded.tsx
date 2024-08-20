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
  id: string;
};

type SubtaskParametersType = {
  type: "add" | "remove";
  taskID: string;
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

  const { isLoading, isError, error, failureCount, mutate } = useMutation({
    mutationFn: async ({ type, taskID, subtask }: SubtaskParametersType) => {
      if (!currentTask) return;
      let promise: Promise<void> | null = null;

      if (type === "add") {
        promise = addSubTaskToFirebase(taskID, subtask);
      } else if (type === "remove") {
        promise = removeSubTaskFromFirebase(taskID, subtask);
      }

      if (!promise) return;

      const loadingID = "task-details";
      addToLoadingQueue(loadingID);

      try {
        await promise;
      } catch (err) {
        openModal("error", "Error syncing, trying again.");
      } finally {
        removeFromLoadingQueue(loadingID);
      }
    },
    retry: 3,
    onSuccess: () => {
      // passively invalidate TasksPage data (non-instant network request).
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  async function addSubTask(title: string) {
    if (!currentTask) return;

    // title formatting...
    if (!checkInputTextValidity(title)) return; // Proper error messages in later update.

    let subtaskPosition: number | null = null;

    setSubTasks((prev) => {
      subtaskPosition = prev.length;

      return [
        ...prev,
        {
          id: Math.random().toString(), // temp
          position: subtaskPosition,
          title: title,
          completed: false,
        },
      ];
    });

    try {
      mutate({
        taskID: currentTask.id,
        type: "add",
        subtask: {
          id: Math.random().toString(),
          position: subtaskPosition || 0,
          title: title,
          completed: false,
        },
      });
    } catch (err) {
      //
    }
  }

  function swapSubTaskPositions(
    incomingTaskId: string,
    outgoingTaskId: string,
  ) {
    if (!currentTask) return;

    setSubTasks((prev) => {
      let incomingTaskPosition: number | undefined = undefined;
      let outgoingTaskPosition: number | undefined = undefined;

      prev.forEach((subTask) => {
        const id = subTask.id;
        if (incomingTaskPosition && outgoingTaskPosition) return;

        if (id === incomingTaskId) {
          incomingTaskPosition = subTask.position;
        } else if (id === outgoingTaskId) {
          outgoingTaskPosition = subTask.position;
        }
      });

      const newSubTasksArray = prev.map((task) => {
        const id = task.id;
        if (id !== incomingTaskId && id !== outgoingTaskId) return task;

        return {
          ...task,
          position:
            id === incomingTaskId ? outgoingTaskPosition : incomingTaskPosition,
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
          key={task.id}
          task={task}
          swapSubTaskPositions={swapSubTaskPositions}
        />,
      );
    }
  }

  useEffect(() => {
    if (!currentTask) updatePath("/error");

    if (failureCount >= 3) {
      openModal(
        "error",
        "Error uploading your subtask, check internet connection and try again.",
      );
    }
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
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            if (!buttonRef.current) return;
            addSubTask(buttonRef.current.value); // Use the input's value
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
