import React from "react";

export class ErrorBoundary extends React.Component<
  { message: string; }, { hasError: boolean; }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
  }

  render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return <h1>{this.props.message ?? "Error happend"}</h1>;
  }
}
