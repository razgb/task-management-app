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
  subTask: SubTaskType;
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
  const [subTasks, setSubTasks] = useState<SubTaskType[]>(
    currentTask ? currentTask.subtasks : [],
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async ({ type, taskID, subTask }: MutationParametersType) => {
      if (!currentTask) return;
      let promise: (() => Promise<void>) | null = null;

      if (type === "add") {
        const titleAlreadyExists = subTasks.some((st) => {
          if (st.title === subTask.title) return true;
          return false;
        });

        if (titleAlreadyExists) {
          openModal("error", "This subtask already exists.");
          if (inputRef.current) inputRef.current.value = "";
          return;
        }

        promise = async () => await addSubTaskToFirebase(taskID, subTask);
      } else if (type === "remove") {
        promise = async () => await removeSubTaskFromFirebase(taskID, subTask);
      }

      if (!promise) return;
      addToLoadingQueue("task-details");

      // await new Promise((_, reject) => setTimeout(reject, 1000)); // testing failures.
      await promise();

      if (type === "add") {
        addSubTaskOnClient(subTask.title);
      } else if (type === "remove") {
        removeSubTaskOnClient(subTask);
      }

      removeFromLoadingQueue("task-details");
    },
    retry: 2,
    onError: () => {
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
              type: "remove",
              subTask: subTask,
            });
          }}
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
            if (!inputRef.current || !currentTask) return;

            await mutateAsync({
              taskID: currentTask.id,
              type: "add",
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
