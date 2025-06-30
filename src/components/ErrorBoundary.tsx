import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-6">🧠💥</div>
            <h1 className="text-2xl font-bold glow-gold mb-4">
              Oops! BagBrain had a moment
            </h1>
            <p className="text-lg mb-6 opacity-80">
              Something went wrong, but don't worry - your bags are safe!
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                🔄 Refresh Page
              </button>
              <details className="text-left text-sm opacity-60">
                <summary className="cursor-pointer hover:opacity-80">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 bg-gray-900 rounded text-xs overflow-auto">
                  {this.state.error?.message}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier wrapping
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  return (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};