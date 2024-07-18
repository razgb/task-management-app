import { Move, Square, SquareCheck } from "lucide-react";
import { useState } from "react";
import ProgressBar from "../shared/ProgressBar";

export default function TaskDetails() {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-primaryBg px-6 py-12">
      <div className="mx-auto flex h-full w-full max-w-[800px] flex-col gap-4">
        <div className="flex h-full max-h-8 gap-4">
          <div className="flex w-full max-w-[150px] items-center rounded-xl bg-secondaryBg px-2 py-1">
            <ProgressBar completion={50} width={1} />
            <p className="flex-shrink-0 text-sm font-light text-textWeak">
              50%
            </p>
          </div>

          <p className="flex items-center rounded-xl bg-secondaryBg p-2 text-sm font-light text-textWeak">
            Last edited: 16-07-2024
          </p>
        </div>

        <h1 className="text-3xl font-bold capitalize">app architecture</h1>

        <p className="mb-8 max-w-[75ch] text-lg text-textWeak">
          A well-designed app architecture is crucial for building robust,
          scalable, and maintainable applications. It provides a clear structure
          and organization for your code, making it easier to understand,
          modify, and extend over time.
        </p>

        <div className="mr-auto h-1/2 flex-1 rounded-2xl border-4 border-secondary-300 py-4 pl-4">
          <ul className="flex h-full flex-col gap-2 overflow-y-scroll pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scrollbar">
            <ToDoItem
              title="Implement User Authentication"
              description="Secure user login and registration using JWT authentication."
              completed={false}
            />
            <ToDoItem
              title="Design Database Schema"
              description="Create a relational database schema to store user data, tasks, and task groups."
              completed={true}
            />
            <ToDoItem
              title="Develop API Endpoints"
              description="Build RESTful API endpoints for user management, task creation, and data retrieval."
              completed={false}
            />
            <ToDoItem
              title="Implement Frontend Routing"
              description="Set up client-side routing to navigate between different pages and components."
              completed={false}
            />
            <ToDoItem
              title="Integrate Third-Party Libraries"
              description="Utilize libraries for data fetching, state management, and UI components."
              completed={false}
            />
            <ToDoItem
              title="Perform Unit Testing"
              description="Write unit tests to ensure the functionality and correctness of individual components."
              completed={false}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

type ToDoItemType = {
  title: string;
  description: string;
  completed: boolean;
};

function ToDoItem({ title, description, completed }: ToDoItemType) {
  const [checked, setChecked] = useState(completed || false);

  return (
    <li className="flex items-center justify-between gap-4 rounded bg-secondary-100 px-4 py-3">
      <div className="flex gap-4">
        <button className="flex-1 cursor-grab p-1">
          <Move size={20} className="stroke-iconStroke" />
        </button>

        <div>
          <h3 className="text-lg font-bold">{title}</h3>

          <p className="max-w-[60ch] text-textWeak">{description}</p>
        </div>
      </div>

      <button
        onClick={() => setChecked((prev) => !prev)}
        role="checkbox"
        aria-checked={checked ? "true" : "false"}
        aria-label="Mark as complete"
      >
        {checked ? (
          <SquareCheck size={32} className="stroke-checkbox" />
        ) : (
          <Square size={32} className="stroke-checkbox" />
        )}
      </button>
    </li>
  );
}

/*

        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold capitalize">app architecture</h1>

          <div className="flex w-full max-w-[150px] items-center gap-1 rounded-xl bg-secondaryBgWeak px-2 py-1">
            <ProgressBar completion={50} width={3} />
            <p className="flex-shrink-0">50%</p>
          </div>

          <p className="rounded-xl bg-secondaryBgWeak px-2 py-1 text-sm">
            Last edited: 16-07-2024
          </p>
        </div>
*/
