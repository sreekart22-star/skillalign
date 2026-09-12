import React, { ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SkillAlign Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 p-8 shadow-xl text-center space-y-6">
            <div className="size-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
              <ShieldAlert className="size-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-slate-900">Something went wrong</h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                SkillAlign encountered an unexpected error in this view. Your session state has been safely preserved.
              </p>
              {this.state.error && (
                <div className="mt-3 p-3 bg-stone-100 rounded-xl text-[11px] font-mono text-stone-700 text-left overflow-x-auto max-h-24">
                  {this.state.error.message}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  (this as any).setState({ hasError: false });
                  window.location.reload();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-900 px-4 py-3 text-xs font-bold text-white hover:bg-sky-950 transition shadow-sm cursor-pointer"
              >
                <RefreshCw className="size-4" />
                <span>Try Again</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-stone-200 px-4 py-3 text-xs font-bold text-stone-800 hover:bg-stone-300 transition cursor-pointer"
              >
                <Home className="size-4" />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
