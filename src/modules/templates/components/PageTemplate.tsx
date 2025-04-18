import styled from "@emotion/native";
import { type PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { FlexView } from "#design-system/utils/FlexView";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const SafePageTemplate = ({ children }: PropsWithChildren) => {
  return (
    <SafeContainer>
      <QueryErrorBoundary>{children}</QueryErrorBoundary>
    </SafeContainer>
  );
};

export const PageTemplate = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <QueryErrorBoundary>{children}</QueryErrorBoundary>
    </Container>
  );
};

const Container = styled(FlexView)(({ theme }) => ({
  backgroundColor: theme.colors.background.app,
}));

const SafeContainer = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.app,
}));
