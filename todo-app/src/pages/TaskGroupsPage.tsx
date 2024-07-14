import TaskGroup from "../components/dashboard/TaskGroup.tsx";

export default function TaskGroupsPage() {
  const output = [];

  for (let i = 0; i < 7; i++) {
    output.push(
      <TaskGroup
        key={i}
        title="App architecture"
        description="Technical blueprint outlining the app's structure, components, and how they interact. Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and"
      />,
    );
  }

  return (
    <div className="grid h-full max-h-[calc(100vh-10rem)] grid-cols-3 rounded-2xl bg-primaryBg p-3">
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
    <div className="scrollbar-thin scrollbar-thumb-secondary-900 scrollbar-track-transparent grid grid-cols-1 content-start gap-4 overflow-y-scroll p-6">
      <h2 className="mb-2 text-2xl font-bold capitalize">{variant}</h2>
      {output}
    </div>
  );
}
