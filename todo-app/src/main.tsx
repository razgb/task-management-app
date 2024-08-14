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
import { getAuth } from "firebase/auth";

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

export { auth };

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
                    <App />
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
