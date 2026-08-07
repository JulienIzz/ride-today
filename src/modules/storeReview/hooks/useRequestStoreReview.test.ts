import { renderHook, waitFor } from "@testing-library/react-native";
import * as StoreReview from "expo-store-review";

import { useRequestStoreReview } from "#modules/storeReview/hooks/useRequestStoreReview";
import { storage, StorageKeys } from "#shared/mmkv/store";

jest.mock("expo-store-review", () => ({
  isAvailableAsync: jest.fn(),
  requestReview: jest.fn(),
}));

const isAvailableAsyncMock = jest.mocked(StoreReview.isAvailableAsync);
const requestReviewMock = jest.mocked(StoreReview.requestReview);

describe("useRequestStoreReview", () => {
  beforeEach(() => {
    storage.clearAll();
    isAvailableAsyncMock.mockResolvedValue(true);
    requestReviewMock.mockResolvedValue();
  });

  it("requests a review and remembers it from the second app launch", async () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 2);

    renderHook(() => useRequestStoreReview({ enabled: true }));

    await waitFor(() => {
      expect(requestReviewMock).toHaveBeenCalledTimes(1);
    });
    expect(storage.getBoolean(StorageKeys.HAS_REQUESTED_STORE_REVIEW)).toBe(
      true,
    );
  });

  it("does not request a review on the first app launch", () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 1);

    renderHook(() => useRequestStoreReview({ enabled: true }));

    expect(isAvailableAsyncMock).not.toHaveBeenCalled();
    expect(requestReviewMock).not.toHaveBeenCalled();
  });

  it("does not request a review twice", () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 3);
    storage.set(StorageKeys.HAS_REQUESTED_STORE_REVIEW, true);

    renderHook(() => useRequestStoreReview({ enabled: true }));

    expect(requestReviewMock).not.toHaveBeenCalled();
  });

  it("does not request a review while disabled", () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 2);

    renderHook(() => useRequestStoreReview({ enabled: false }));

    expect(requestReviewMock).not.toHaveBeenCalled();
  });

  it("stays eligible when the store review dialog is unavailable", async () => {
    storage.set(StorageKeys.APP_LAUNCH_COUNT, 2);
    isAvailableAsyncMock.mockResolvedValue(false);

    renderHook(() => useRequestStoreReview({ enabled: true }));

    await waitFor(() => {
      expect(isAvailableAsyncMock).toHaveBeenCalledTimes(1);
    });
    expect(requestReviewMock).not.toHaveBeenCalled();
    expect(
      storage.getBoolean(StorageKeys.HAS_REQUESTED_STORE_REVIEW),
    ).toBeUndefined();
  });
});
