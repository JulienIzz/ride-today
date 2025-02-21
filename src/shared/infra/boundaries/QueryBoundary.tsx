import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { type PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ActivityIndicator } from "react-native";

import { Typography } from "#shared/fonts/Typography";

interface Props {
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  /**
   * When any key in this array changes, ErrorBoundary
   * resets its error state and re-renders children.
   */
  resetKeys?: unknown[];
  /**
   * Called before resetting query errors, you can
   * do additional logic if needed
   */
  onReset?: () => void;
}

export const QueryErrorBoundary = ({
  loadingFallback,
  errorFallback,
  resetKeys,
  onReset,
  children,
}: Props & PropsWithChildren) => {
  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary
        fallback={errorFallback ? errorFallback : <ErrorFallback />}
        resetKeys={resetKeys}
        onReset={onReset}
      >
        <Suspense
          fallback={loadingFallback ? loadingFallback : <LoaderFallback />}
        >
          {children}
        </Suspense>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
};

const LoaderFallback = () => {
  return <ActivityIndicator />;
};

const ErrorFallback = () => {
  return <Typography variant="body" text="Error" />;
};
