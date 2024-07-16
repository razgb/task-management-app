import { MoveDiagonal } from "lucide-react";
import Task from "./Task";
import Link from "../shared/Link";

export default function RecentTasks() {
  return (
    <div className="rounded-2xl bg-primaryBg p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Recent Task Groups</h2>
        <Link
          to="/tasks"
          className="rounded-full bg-secondaryBg p-2 hover:bg-secondaryBgStrong"
        >
          <MoveDiagonal size={30} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Task
          title="App specifics"
          description="Detailed specifications for the app's functionality, features, and user interactions."
          hideGrabIcon={true}
        />
        <Task
          title="App design"
          description="Visual design elements, user interface (UI) layout, and overall aesthetic of the app."
          hideGrabIcon={true}
        />
        <Task
          title="App notes"
          description="General notes, ideas, and brainstorming related to the app's development."
          hideGrabIcon={true}
        />
        <Task
          title="App architecture"
          description="Technical blueprint outlining the app's structure, components, and how they interact. Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact.Technical blueprint outlining the app's structure, components, and how they interact."
          hideGrabIcon={true}
        />
      </div>
    </div>
  );
}
