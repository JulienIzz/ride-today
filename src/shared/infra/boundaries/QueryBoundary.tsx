import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { type PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ActivityIndicator } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
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
  return (
    <CenteredView>
      <ActivityIndicator />
    </CenteredView>
  );
};

const ErrorFallback = () => {
  const theme = useTheme();
  return (
    <CenteredView>
      <Typography
        variant="P1"
        color={theme.colors.neutral[0]}
        text={t`An error has occurred`}
      />
    </CenteredView>
  );
};

const CenteredView = styled.View({
  justifyContent: "center",
  alignItems: "center",
  ...absoluteFillStyle,
});
