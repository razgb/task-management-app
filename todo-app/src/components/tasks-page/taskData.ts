import { TaskType } from "../dashboard/Task";

const draftTasksData: TaskType[] = [
  {
    title: "Implement User Authentication",
    description:
      "Secure user login and registration using JWT authentication and registration using JWT authentication.",
    hasSubtasks: true,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "draft",
  },
  {
    title: "Design Database Schema",
    description:
      "Create a relational database schema to store user data, tasks, and task groups.",
    hasSubtasks: false,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "draft",
  },
  {
    title: "Develop API Endpoints",
    description:
      "Build RESTful API endpoints for user management, task creation, and data retrieval.",
    hasSubtasks: false,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "draft",
  },
];

const inProgressTasksData: TaskType[] = [
  {
    title: "Implement Frontend Routing",
    description:
      "Set up client-side routing to navigate between different pages and components.",
    hasSubtasks: false,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "in-progress",
  },
  {
    title: "Integrate Third-Party Libraries",
    description:
      "Utilize libraries for data fetching, state management, and UI components.",
    hasSubtasks: true,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "in-progress",
  },
  {
    title: "Perform Unit Testing",
    description:
      "Write unit tests to ensure the functionality and correctness of individual components.",
    hasSubtasks: false,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "in-progress",
  },
];

const completeTasksData: TaskType[] = [
  {
    title: "Deploy Application",
    description: "Deploy the application to a production environment.",
    hasSubtasks: true,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "complete",
  },
  {
    title: "Monitor and Maintain",
    description: "Monitor application performance and address any issues.",
    hasSubtasks: false,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "complete",
  },
  {
    title: "Gather User Feedback",
    description: "Collect user feedback to improve the application.",
    hasSubtasks: true,
    subtaskCompletion: Math.floor(Math.random() * 100),
    status: "complete",
  },
];

export { draftTasksData, inProgressTasksData, completeTasksData };
