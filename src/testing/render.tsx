import styled from "@emotion/native";
import { ThemeProvider } from "@emotion/react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { RenderOptions } from "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { darkTheme } from "#design-system/theme/theme";
import { I18nProvider } from "#shared/i18n/I18n.provider";

const queryClient = new QueryClient();

export const renderWithProviders = (
  component: React.ReactElement,
  options?: RenderOptions,
) => {
  return render(
    <I18nProvider>
      <ThemeProvider theme={darkTheme}>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <RootView>{component}</RootView>
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </I18nProvider>,
    options,
  );
};

const RootView = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.background.app,
  flex: 1,
}));
