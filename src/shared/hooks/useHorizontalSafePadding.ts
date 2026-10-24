import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Horizontal padding that keeps content clear of the side insets, such as the
 * 84pt vertical bar of the iPhone Duo, which can sit on either edge.
 * Apply it to content inside scroll views so backgrounds stay edge to edge.
 */
export const useHorizontalSafePadding = (base: number) => {
  const { left, right } = useSafeAreaInsets();

  return { paddingLeft: left + base, paddingRight: right + base };
};
