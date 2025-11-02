
  import { createRoot } from "react-dom/client";
  import { Component, ErrorInfo, ReactNode } from "react";
  import App from "./App.tsx";
  import "./index.css";

  console.log("🚀 Starting React app...");

  // Error Boundary Component
  interface ErrorBoundaryProps {
    children: ReactNode;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
  }

  class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("🚨 React Error Boundary caught an error:", error);
      console.error("🚨 Error Info:", errorInfo);
      this.setState({ error, errorInfo });
    }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial, sans-serif' }}>
            <h1>🚨 Application Error</h1>
            <h2>Something went wrong with the app.</h2>
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
              <summary>Error Details (click to expand)</summary>
              <strong>Error:</strong> {this.state.error?.toString()}
              <br />
              <strong>Stack:</strong> {this.state.error?.stack}
              <br />
              <strong>Component Stack:</strong> {this.state.errorInfo?.componentStack}
            </details>
          </div>
        );
      }

      return this.props.children;
    }
  }

  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("❌ Root element not found!");
      document.body.innerHTML = '<div style="padding: 20px; color: red;">❌ Root element not found!</div>';
    } else {
      console.log("✅ Root element found, rendering full app...");
      const root = createRoot(rootElement);
      root.render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
      console.log("✅ Full app rendered successfully");
    }
  } catch (error) {
    console.error("❌ Error starting React app:", error);
    document.body.innerHTML = `<div style="padding: 20px; color: red;">❌ Error: ${error}</div>`;
  }
  