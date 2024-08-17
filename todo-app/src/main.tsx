import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";

import { RouterProvider } from "./stores/router/RouterContext.tsx";
import ThemeContextProvider from "./stores/timer/ThemeContext.tsx";
import AccessibilityContextProvider from "./stores/accessibility/AccessibilityProvider.tsx";
import TimerContextProvider from "./stores/timer/TimerContextProvider.tsx";
import { LoadingContextProvider } from "./stores/loading/LoadingContext.tsx";
import UserContextProvider from "./stores/user/UserContextProvider.tsx";
import { ModalContextProvider } from "./stores/modal/ModalContextProvider.tsx";

const queryClient = new QueryClient();

import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { TaskContextProvider } from "./stores/taskExpanded/TaskExpandedContextProvider.tsx";
import { TaskType } from "./components/dashboard/Task.tsx";

const firebaseConfig = {
  apiKey: "AIzaSyCDtHn7FK1nLD6MvQvI2wkZMAVPX22LwBw",
  authDomain: "task-buddy-project.firebaseapp.com",
  projectId: "task-buddy-project",
  storageBucket: "task-buddy-project.appspot.com",
  messagingSenderId: "933501368680",
  appId: "1:933501368680:web:2d9f88315cab190aaefedd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

const tasks = [
  {
    title: "Design Spacecraft Heat Shield",
    description: "Create a heat-resistant shield for atmospheric re-entry.",
    subtasks: [],
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Optimize Database Queries",
    description:
      "Improve performance of SQL queries for faster data retrieval.",
    subtasks: [],
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Calibrate CNC Machine",
    description:
      "Ensure precision of computer numerical control machine for manufacturing.",
    subtasks: [],
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Implement JWT Authentication",
    description: "",
    subtasks: [],
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Design Lunar Habitat",
    description: "Create plans for sustainable living quarters on the Moon.",
    subtasks: [],
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Refactor Legacy Code",
    description: "",
    subtasks: [],
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Optimize Assembly Line",
    description: "Streamline manufacturing process for increased efficiency.",
    subtasks: [],
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Implement WebSocket Communication",
    description: "",
    subtasks: [],
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Design Mars Rover",
    description: "Create plans for next-generation Mars exploration vehicle.",
    subtasks: [],
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Develop CI/CD Pipeline",
    description: "",
    subtasks: [],
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Analyze Telescope Data",
    description: "Process and interpret data from deep space observations.",
    subtasks: [],
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Implement Responsive Design",
    description: "",
    subtasks: [],
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Optimize Fuel Efficiency",
    description: "Improve fuel consumption in automobile engines.",
    subtasks: [],
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Deploy Kubernetes Cluster",
    description: "",
    subtasks: [],
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Design Satellite Communication System",
    description:
      "Create efficient data transmission system for orbital satellites.",
    subtasks: [],
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
];

// async function sendData(task: unknown) {
//   const user = auth.currentUser;
//   if (!user) return;

//   const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
//   const docRef = await addDoc(tasksCollectionRef, task);
//   return docRef;
// }

// let i = 0;
// if (i === 0) {
//   tasks.forEach((task) => sendData(task));
//   i++;
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider>
      <ThemeContextProvider>
        <AccessibilityContextProvider>
          <TimerContextProvider>
            <LoadingContextProvider>
              <UserContextProvider>
                <QueryClientProvider client={queryClient}>
                  <ModalContextProvider>
                    <TaskContextProvider>
                      <App />
                    </TaskContextProvider>
                  </ModalContextProvider>
                </QueryClientProvider>
              </UserContextProvider>
            </LoadingContextProvider>
          </TimerContextProvider>
        </AccessibilityContextProvider>
      </ThemeContextProvider>
    </RouterProvider>
  </React.StrictMode>,
);
