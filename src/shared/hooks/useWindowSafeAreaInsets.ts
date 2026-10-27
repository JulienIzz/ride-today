import { createContext, useContext } from "react";
import {
  type EdgeInsets,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

/**
 * Insets of the window itself, for surfaces that render over the whole
 * window (modals, sheets) from inside a container that already consumed some
 * insets and zeroed them for its children (see DualPager).
 */
export const WindowSafeAreaInsetsContext = createContext<EdgeInsets | null>(
  null,
);

export const useWindowSafeAreaInsets = (): EdgeInsets => {
  const windowInsets = useContext(WindowSafeAreaInsetsContext);
  const insets = useSafeAreaInsets();

  return windowInsets ?? insets;
};
