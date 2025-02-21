import { type PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ActivityIndicator } from "react-native";

import { Typography } from "#shared/fonts/Typography";

interface Props {
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

export const QueryErrorBoundary = ({
  loadingFallback,
  errorFallback,
  children,
}: Props & PropsWithChildren) => {
  return (
    <Suspense fallback={loadingFallback ? loadingFallback : <LoaderFallback />}>
      <ErrorBoundary
        fallback={errorFallback ? errorFallback : <ErrorFallback />}
      >
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

const LoaderFallback = () => {
  return <ActivityIndicator />;
};

const ErrorFallback = () => {
  return <Typography variant="body" text="Error" />;
};
