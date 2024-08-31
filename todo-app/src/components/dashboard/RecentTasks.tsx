import { MoveDiagonal } from "lucide-react";
import Task from "./Task";
import Link from "../shared/Link";
import useAccessibility from "../../stores/accessibility/useAccessibility";

/*
Choice one: add a check to see if total number of tasks
a user has is larger than 3/4 to then render this recent task container.
----------
Choice two: we can just show a cute svg icon of a person saying your
tasks will show up here.
*/

export default function RecentTasks() {
  const { accessibility } = useAccessibility();
  const {
    highContrastMode,
    increaseLetterSpacing,
    removeRoundEdges,
    fontSizeMap,
    accessibilityTextColor,
  } = accessibility;

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
            fontSize: `${fontSizeMap["3xl"]}px`,
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
          <MoveDiagonal size={fontSizeMap["3xl"]} />
        </Link>
      </div>

      <div className="grid h-fit grid-cols-1 gap-4 overflow-y-scroll p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
        <Task
          createdAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          updatedAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          authorID=""
          id={Math.random().toString()}
          subTasks={[]}
          title="Research the impact of climate change on coral reefs"
          description=""
          hideGrabIcon={true}
          status="draft"
        />
        <Task
          createdAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          updatedAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          authorID=""
          id={Math.random().toString()}
          subTasks={[]}
          title="Analyze causes of the Revolution"
          description="Study primary and secondary sources to understand the social, economic, and political factors that led to the French Revolution."
          hideGrabIcon={true}
          status="in-progress"
        />
        <Task
          createdAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          updatedAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          authorID=""
          id={Math.random().toString()}
          subTasks={[]}
          title="Learn about the history of artificial intelligence"
          description="Explore the development of AI from its early beginnings to modern advancements."
          hideGrabIcon={true}
          status="in-progress"
        />
        <Task
          createdAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          updatedAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          authorID=""
          id={Math.random().toString()}
          subTasks={[]}
          title="Create a digital painting using Adobe Photoshop"
          description="Experiment with different tools and techniques to create a unique digital artwork."
          hideGrabIcon={true}
          status="complete"
        />
      </div>
    </div>
  );
}
