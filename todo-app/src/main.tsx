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
import { ModalContextProvider } from "./stores/modal/ModalContextProvider.tsx";

const queryClient = new QueryClient();

import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
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
    subTasks: {},
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Optimize Database Queries",
    description:
      "Improve performance of SQL queries for faster data retrieval.",
    subTasks: {},
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Calibrate CNC Machine",
    description:
      "Ensure precision of computer numerical control machine for manufacturing.",
    subTasks: {},
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Implement JWT Authentication",
    description: "",
    subTasks: {},
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Design Lunar Habitat",
    description: "Create plans for sustainable living quarters on the Moon.",
    subTasks: {},
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Refactor Legacy Code",
    description: "",
    subTasks: {},
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Optimize Assembly Line",
    description: "Streamline manufacturing process for increased efficiency.",
    subTasks: {},
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Implement WebSocket Communication",
    description: "",
    subTasks: {},
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Design Mars Rover",
    description: "Create plans for next-generation Mars exploration vehicle.",
    subTasks: {},
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Develop CI/CD Pipeline",
    description: "",
    subTasks: {},
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Analyze Telescope Data",
    description: "Process and interpret data from deep space observations.",
    subTasks: {},
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Implement Responsive Design",
    description: "",
    subTasks: {},
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Optimize Fuel Efficiency",
    description: "Improve fuel consumption in automobile engines.",
    subTasks: {},
    status: "complete",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Deploy Kubernetes Cluster",
    description: "",
    subTasks: {},
    status: "draft",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
  {
    title: "Design Satellite Communication System",
    description:
      "Create efficient data transmission system for orbital satellites.",
    subTasks: {},
    status: "in-progress",
    authorID: "vphRp4I7MXULXKfmWPrMSVtlcXP2",
  },
];

// async function sendData(task: unknown) {
//   const user = auth.currentUser;
//   if (!user) return;

//   if (typeof task !== "object" || task === null) {
//     throw new Error("Task must be an object");
//   }

//   console.log(user.uid);
//   const tasksCollectionRef = collection(db, "users", user.uid, "tasks");
//   const docRef = await addDoc(tasksCollectionRef, {
//     ...task,
//     createdAt: serverTimestamp(),
//     updatedAt: serverTimestamp(),
//   });

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
              <QueryClientProvider client={queryClient}>
                <ModalContextProvider>
                  <TaskContextProvider>
                    <App />
                  </TaskContextProvider>
                </ModalContextProvider>
              </QueryClientProvider>
            </LoadingContextProvider>
          </TimerContextProvider>
        </AccessibilityContextProvider>
      </ThemeContextProvider>
    </RouterProvider>
  </React.StrictMode>,
);
