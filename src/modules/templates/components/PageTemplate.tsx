import styled from "@emotion/native";
import type { PropsWithChildren } from "react";

export const PageTemplate = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

const Container = styled.SafeAreaView({
  flex: 1,
});
