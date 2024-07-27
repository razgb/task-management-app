import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider } from "./stores/RouterContext.tsx";
import ThemeContextProvider from "./stores/ThemeContext.tsx";
import AccessibilityContextProvider from "./stores/accessibility/AccessibilityProvider.tsx";
import TimerContextProvider from "./stores/timer/TimerContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider>
      <ThemeContextProvider>
        <AccessibilityContextProvider>
          <TimerContextProvider>
            <App />
          </TimerContextProvider>
        </AccessibilityContextProvider>
      </ThemeContextProvider>
    </RouterProvider>
  </React.StrictMode>,
);
