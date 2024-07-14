import TaskGroup from "../components/dashboard/TaskGroup.tsx";

export default function TaskGroupsPage() {
  const output = [];

  for (let i = 0; i < 7; i++) {
    output.push(
      <TaskGroup
        key={i}
        title="App architecture"
        description="Technical blueprint outlining the app's structure, components, and how they interact."
      />,
    );
  }

  return (
    <div className="grid h-full grid-cols-3 gap-4 overflow-hidden rounded-2xl bg-primaryBg p-3">
      <TaskGroupColumn output={output} variant="draft" />
      <TaskGroupColumn output={output} variant="in-progress" />
      <TaskGroupColumn output={output} variant="complete" />
    </div>
  );
}

type TaskGroupColumnType = {
  output: React.ReactNode[];
  variant: "draft" | "in-progress" | "complete";
};

function TaskGroupColumn({ output, variant }: TaskGroupColumnType) {
  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <h2 className="mb-4 text-2xl font-bold capitalize">{variant}</h2>
      <div className="scrollbar-thumb-scrollbar flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent">
        <div className="grid grid-cols-1 content-start gap-4">{output}</div>
      </div>
    </div>
  );
}
