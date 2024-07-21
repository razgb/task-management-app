import { MoveDiagonal } from "lucide-react";
import Task from "./Task";
import Link from "../shared/Link";

export default function RecentTasks() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-primaryBg p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Recent Tasks</h2>
        <Link
          to="/tasks"
          className="rounded-full bg-secondaryBg p-2 hover:bg-secondaryBgStrong"
        >
          <MoveDiagonal size={24} />
        </Link>
      </div>

      <div className="grid h-fit grid-cols-1 gap-4 overflow-y-scroll p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        <Task
          title="Research the impact of climate change on coral reefs"
          description=""
          hideGrabIcon={true}
          hasSubtasks={false}
        />
        <Task
          title="Analyze causes of the Revolution"
          description="Study primary and secondary sources to understand the social, economic, and political factors that led to the French Revolution."
          hideGrabIcon={true}
          hasSubtasks={true}
        />
        <Task
          title="Learn about the history of artificial intelligence"
          description="Explore the development of AI from its early beginnings to modern advancements."
          hideGrabIcon={true}
          hasSubtasks={true}
        />
        <Task
          title="Create a digital painting using Adobe Photoshop"
          description="Experiment with different tools and techniques to create a unique digital artwork."
          hideGrabIcon={true}
          hasSubtasks={true}
        />
      </div>
    </div>
  );
}
