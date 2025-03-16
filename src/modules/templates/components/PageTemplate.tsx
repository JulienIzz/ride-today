import styled from "@emotion/native";
import { type PropsWithChildren } from "react";

import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const PageTemplate = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <QueryErrorBoundary>{children}</QueryErrorBoundary>
    </Container>
  );
};

const Container = styled.SafeAreaView({
  flex: 1,
});
