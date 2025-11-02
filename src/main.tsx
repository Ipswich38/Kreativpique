
  import { createRoot } from "react-dom/client";
  import "./index.css";

  // Minimal test to see if React works at all
  console.log("🚀 Starting React app...");

  function TestApp() {
    return (
      <div style={{ padding: '20px', fontSize: '24px', color: 'blue' }}>
        <h1>React App is Working! 🎉</h1>
        <p>If you can see this, React is loading correctly.</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </div>
    );
  }

  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("❌ Root element not found!");
      document.body.innerHTML = '<div style="padding: 20px; color: red; font-size: 20px;">❌ Error: Root element not found!</div>';
    } else {
      console.log("✅ Root element found, creating React root...");
      const root = createRoot(rootElement);
      root.render(<TestApp />);
      console.log("✅ React test app rendered successfully");
    }
  } catch (error) {
    console.error("❌ Error starting React app:", error);
    document.body.innerHTML = `<div style="padding: 20px; color: red; font-size: 18px;">❌ Error: ${error}</div>`;
  }
  