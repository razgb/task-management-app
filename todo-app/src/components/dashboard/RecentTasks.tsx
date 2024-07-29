import { MoveDiagonal } from "lucide-react";
import Task from "./Task";
import Link from "../shared/Link";
import useFontSize from "../../stores/accessibility/useFontSize";
import useAccessibility from "../../stores/accessibility/useAccessibility";
import useAccessibilityTextColor from "../../stores/accessibility/useAccessibilityTextColor";

/*
Choice one: add a check to see if total number of tasks 
a user has is larger than 3/4 to then render this recent task container.  
----------
Choice two: we can just show a cute svg icon of a person saying your 
tasks will show up here. 
*/

export default function RecentTasks() {
  const fontSizes = useFontSize();
  const { accessibility } = useAccessibility();
  const { highContrastMode, increaseLetterSpacing, removeRoundEdges } =
    accessibility;

  const { accessibilityTextColor } = useAccessibilityTextColor();

  return (
    <div
      style={{
        borderRadius: removeRoundEdges ? "0" : "",
      }}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-primaryBg p-8"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="font-bold"
          style={{
            fontSize: `${fontSizes["3xl"]}px`,
            color: highContrastMode ? accessibilityTextColor : "",
            letterSpacing: increaseLetterSpacing ? "0.1rem" : "",
          }}
        >
          Recent Tasks
        </h2>
        <Link
          to="/tasks"
          className="rounded-full bg-primaryBg p-2 transition-colors hover:bg-secondaryBgWeak"
        >
          <MoveDiagonal size={fontSizes["3xl"]} />
        </Link>
      </div>

      <div className="grid h-fit grid-cols-1 gap-4 overflow-y-scroll p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        <Task
          title="Research the impact of climate change on coral reefs"
          description=""
          hideGrabIcon={true}
          hasSubtasks={false}
          status="draft"
          subtaskCompletion={Math.floor(Math.random() * 100)}
        />
        <Task
          title="Analyze causes of the Revolution"
          description="Study primary and secondary sources to understand the social, economic, and political factors that led to the French Revolution."
          hideGrabIcon={true}
          hasSubtasks={true}
          status="in-progress"
          subtaskCompletion={Math.floor(Math.random() * 100)}
        />
        <Task
          title="Learn about the history of artificial intelligence"
          description="Explore the development of AI from its early beginnings to modern advancements."
          hideGrabIcon={true}
          hasSubtasks={true}
          status="in-progress"
          subtaskCompletion={Math.floor(Math.random() * 100)}
        />
        <Task
          title="Create a digital painting using Adobe Photoshop"
          description="Experiment with different tools and techniques to create a unique digital artwork."
          hideGrabIcon={true}
          hasSubtasks={true}
          status="complete"
          subtaskCompletion={Math.floor(Math.random() * 100)}
        />
      </div>
    </div>
  );
}
