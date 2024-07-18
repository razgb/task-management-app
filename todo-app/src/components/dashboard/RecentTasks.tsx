import { MoveDiagonal } from "lucide-react";
import Task from "./Task";
import Link from "../shared/Link";

export default function RecentTasks() {
  return (
    <div className="rounded-2xl bg-primaryBg p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Recent Tasks</h2>
        <Link
          to="/tasks"
          className="rounded-full bg-secondaryBg p-2 hover:bg-secondaryBgStrong"
        >
          <MoveDiagonal size={24} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Task
          title="Research the impact of climate change on coral reefs"
          description="Read scientific articles and gather data on the effects of climate change on coral reefs."
          hideGrabIcon={true}
        />
        <Task
          title="Analyze the causes of the French Revolution"
          description="Study primary and secondary sources to understand the social, economic, and political factors that led to the French Revolution."
          hideGrabIcon={true}
        />
        <Task
          title="Learn about the history of artificial intelligence"
          description="Explore the development of AI from its early beginnings to modern advancements."
          hideGrabIcon={true}
        />
        <Task
          title="Create a digital painting using Adobe Photoshop"
          description="Experiment with different tools and techniques to create a unique digital artwork."
          hideGrabIcon={true}
        />
      </div>
    </div>
  );
}
