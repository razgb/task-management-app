import Task from "../components/dashboard/Task.tsx";

import { todoItems } from "../components/tasks-page/dummyItems";

export default function TasksPage() {
  const output = todoItems.map((item, index) => (
    <Task
      key={index}
      title={item.title}
      description={item.description}
      hideGrabIcon={false}
      hasSubtasks={item.hasSubtasks}
    />
  ));

  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg p-3">
      <div className="grid h-full grid-cols-3">
        <TaskColumn output={output} variant="draft" />
        <TaskColumn output={output} variant="in-progress" />
        <TaskColumn output={output} variant="complete" />
      </div>
    </div>
  );
}

type TaskGroupColumnType = {
  output: React.ReactNode[];
  variant: "draft" | "in-progress" | "complete";
};

function TaskColumn({ output, variant }: TaskGroupColumnType) {
  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <h2 className="mb-4 text-2xl font-bold capitalize">{variant}</h2>
      <div className="flex-1 overflow-y-auto p-2 pr-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        <div className="grid grid-cols-1 content-start gap-3">{output}</div>
      </div>
    </div>
  );
}
