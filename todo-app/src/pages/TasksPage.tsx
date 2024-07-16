import Task from "../components/dashboard/Task.tsx";

export default function TasksPage() {
  const output = [];
  for (let i = 0; i < 7; i++) {
    output.push(
      <Task
        key={i}
        title="App architecture"
        description="Technical blueprint outlining the app's structure, components, and how they interact."
        hideGrabIcon={false}
      />,
    );
  }

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
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        <div className="grid grid-cols-1 content-start gap-4">{output}</div>
      </div>
    </div>
  );
}
