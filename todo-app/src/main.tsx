import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider } from "./stores/router/RouterContext.tsx";
import ThemeContextProvider from "./stores/timer/ThemeContext.tsx";
import AccessibilityContextProvider from "./stores/accessibility/AccessibilityProvider.tsx";
import TimerContextProvider from "./stores/timer/TimerContextProvider.tsx";
import { LoadingContextProvider } from "./stores/loading/LoadingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider>
      <ThemeContextProvider>
        <AccessibilityContextProvider>
          <TimerContextProvider>
            <LoadingContextProvider>
              <App />
            </LoadingContextProvider>
          </TimerContextProvider>
        </AccessibilityContextProvider>
      </ThemeContextProvider>
    </RouterProvider>
  </React.StrictMode>,
);
