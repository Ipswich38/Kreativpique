
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // Debug: Add error boundary and logging
  console.log("Starting React app...");

  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("Root element not found!");
      document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>';
    } else {
      console.log("Root element found, creating React root...");
      const root = createRoot(rootElement);
      root.render(<App />);
      console.log("React app rendered successfully");
    }
  } catch (error) {
    console.error("Error starting React app:", error);
    // Fallback: show error message
    document.body.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error}</div>`;
  }
  