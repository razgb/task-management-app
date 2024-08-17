import { TaskType } from "../dashboard/Task";

export const taskData: TaskType[] = [
  {
    id: Math.random().toString(), // temp
    title: "Implement User Authentication",
    description:
      "Secure user login and registration using JWT authentication and registration using JWT authentication.",
    status: "draft",
    subtasks: [],
  },
  {
    id: Math.random().toString(), // temp
    title: "Design Database Schema",
    description:
      "Create a relational database schema to store user data, tasks, and task groups.",
    subtasks: [
      {
        id: Math.random().toString(), // temp
        title: "Create User Login Form",
        position: 1,
        completed: true,
      },
      {
        id: Math.random().toString(), // temp
        title: "Set Up JWT Authentication",
        position: 2,
        completed: false,
      },
      {
        id: Math.random().toString(), // temp
        title: "Implement Password Reset",
        position: 3,
        completed: false,
      },
    ],
    status: "draft",
  },
  {
    id: Math.random().toString(), // temp
    title: "Develop API Endpoints",
    description:
      "Build RESTful API endpoints for user management, task creation, and data retrieval.",
    subtasks: [],
    status: "draft",
  },

  {
    id: Math.random().toString(), // temp
    title: "Implement Frontend Routing",
    description:
      "Set up client-side routing to navigate between different pages and components.",
    subtasks: [],
    status: "in-progress",
  },
  {
    id: Math.random().toString(), // temp
    title: "Integrate Third-Party Libraries",
    description:
      "Utilize libraries for data fetching, state management, and UI components.",
    subtasks: [],
    status: "in-progress",
  },
  {
    id: Math.random().toString(), // temp
    title: "Perform Unit Testing",
    description:
      "Write unit tests to ensure the functionality and correctness of individual components.",
    subtasks: [],
    status: "in-progress",
  },

  {
    id: Math.random().toString(), // temp
    title: "Deploy Application",
    description: "Deploy the application to a production environment.",
    subtasks: [],
    status: "complete",
  },
  {
    id: Math.random().toString(), // temp
    title: "Monitor and Maintain",
    description: "Monitor application performance and address any issues.",
    subtasks: [],
    status: "complete",
  },
  {
    id: Math.random().toString(), // temp
    title: "Gather User Feedback",
    description: "Collect user feedback to improve the application.",
    subtasks: [],
    status: "complete",
  },
];
