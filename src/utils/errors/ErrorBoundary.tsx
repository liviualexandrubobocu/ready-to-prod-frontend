// External
import { Component, ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{
  children: ReactNode;
  fallback: ReactNode;
}> {
  state: { hasError: boolean };
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props?.fallback;
    }

    return this.props?.children;
  }
}
