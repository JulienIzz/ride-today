import styled from "@emotion/native";
import { type PropsWithChildren } from "react";

import { QueryBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const PageTemplate = ({ children }: PropsWithChildren) => {
  return (
    <QueryBoundary>
      <Container>{children}</Container>
    </QueryBoundary>
  );
};

const Container = styled.SafeAreaView({
  flex: 1,
});
