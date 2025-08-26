"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import  NotFoundSection  from "./not-found-section";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Send error to 404 monitoring system
    const url = window.location.href;
    fetch("/api/404-monitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        referer: document.referrer || null,
        userAgent: navigator.userAgent || null,
        pathname: window.location.pathname,
        errorType: "general",
        httpStatus: 500,
      }),
    }).catch(err => {
      console.error("Error sending error notification:", err);
    });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <NotFoundSection
          title="Something went wrong"
          subtitle="We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 