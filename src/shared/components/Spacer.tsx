import styled from "@emotion/native";

export const Spacer = styled.View<{
  size?: number;
  horizontal?: boolean;
  vertical?: boolean;
}>(({ size, horizontal, vertical }) => {
  if (size) {
    return {
      width: horizontal ? size : undefined,
      height: vertical ? size : undefined,
    };
  }

  return {
    flex: 1,
  };
});
