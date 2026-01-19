import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; fallback: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  // 1. Update state so the next render shows the fallback UI
  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // 2. Log the error to an analytics service (like Sentry)
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;