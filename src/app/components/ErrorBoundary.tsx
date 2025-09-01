'use client';
import React, { Component, ReactNode } from 'react';
import { LABELS } from '@/app/labels';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h2>{LABELS.errorHandling.somethingWentWrongTitle}</h2>
          <p>{LABELS.errorHandling.unexpectedErrorMessage}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            {LABELS.errorHandling.tryAgainButtonText}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
