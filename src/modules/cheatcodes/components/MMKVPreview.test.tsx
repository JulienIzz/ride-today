import { act, screen } from "@testing-library/react-native";

import { MMKVPreview } from "#modules/cheatcodes/components/MMKVPreview";
import { storage, StorageKeys } from "#shared/mmkv/store";
import { renderWithProviders } from "#testing/render";

describe("MMKVPreview", () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it("displays stored keys with their values", () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 3);
    storage.set(StorageKeys.HAS_REQUESTED_STORE_REVIEW, true);
    storage.set(StorageKeys.CUSTOM_THEME, "dark");

    renderWithProviders(<MMKVPreview />);

    expect(screen.getByText("appLaunchCount")).toBeOnTheScreen();
    expect(screen.getByText("3")).toBeOnTheScreen();
    expect(screen.getByText("hasRequestedStoreReview")).toBeOnTheScreen();
    expect(screen.getByText("true")).toBeOnTheScreen();
    expect(screen.getByText("customTheme")).toBeOnTheScreen();
    expect(screen.getByText('"dark"')).toBeOnTheScreen();
  });

  it("shows an empty state when nothing is stored", () => {
    renderWithProviders(<MMKVPreview />);

    expect(screen.getByText("Empty")).toBeOnTheScreen();
  });

  it("refreshes when a stored value changes", () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 1);

    renderWithProviders(<MMKVPreview />);

    act(() => {
      storage.set(StorageKeys.APP_LAUNCH_COUNT, 2);
    });

    expect(screen.getByText("2")).toBeOnTheScreen();
  });
});
