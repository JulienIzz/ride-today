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
    <FlexView>
      <QueryErrorBoundary>{children}</QueryErrorBoundary>
    </FlexView>
  );
};

const SafeContainer = styled(SafeAreaView)({
  flex: 1,
});
