import { useMemo } from "react";
import { TaskSkeletonLoadMultiple } from "../../components/sub-components/TaskSkeletonLoad";
import Task, { TaskType } from "../../components/Task";
import { TaskGroupColumnType } from "../../components/TaskColumn";

type Parameters = {
  tasks: TaskType[] | undefined;
  loading: boolean;
  column?: TaskGroupColumnType["variant"];
  hideGrabIcon: boolean;
};

/**
 * Turns raw task data from firebase into an array of JSX
 * <Task/> elements that are relevant to their respective
 * parent column's variant property.
 */
export function useProccessTaskData({
  tasks,
  loading,
  column,
  hideGrabIcon,
}: Parameters) {
  const output = useMemo(() => {
    let result: React.ReactNode | React.ReactNode[] | TaskType[] | undefined =
      tasks;

    if (loading) {
      result = <TaskSkeletonLoadMultiple />;
    } else if (!loading && result) {
      if (column) {
        result = result.filter((task) => task.status === column);
      }

      result = result.map((task) => {
        return (
          <Task
            authorID={task.authorID}
            key={task.id}
            id={task.id}
            subTasks={task.subTasks}
            dueDate={task.dueDate}
            title={task.title}
            description={task.description}
            status={task.status}
            createdAt={task.createdAt}
            updatedAt={task.updatedAt}
            hideGrabIcon={hideGrabIcon}
          />
        );
      });
    } else result = undefined;

    return result;
  }, [loading, tasks, column, hideGrabIcon]);

  return output;
}
