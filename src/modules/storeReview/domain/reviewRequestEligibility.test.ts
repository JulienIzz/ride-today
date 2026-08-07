import { canRequestStoreReview } from "#modules/storeReview/domain/reviewRequestEligibility";

describe("canRequestStoreReview", () => {
  it("is not eligible on the first app launch", () => {
    expect(
      canRequestStoreReview({
        appLaunchCount: 1,
        hasRequestedStoreReview: false,
      }),
    ).toBe(false);
  });

  it("is eligible from the second app launch when never requested", () => {
    expect(
      canRequestStoreReview({
        appLaunchCount: 2,
        hasRequestedStoreReview: false,
      }),
    ).toBe(true);
    expect(
      canRequestStoreReview({
        appLaunchCount: 10,
        hasRequestedStoreReview: false,
      }),
    ).toBe(true);
  });

  it("is not eligible when a review was already requested", () => {
    expect(
      canRequestStoreReview({
        appLaunchCount: 5,
        hasRequestedStoreReview: true,
      }),
    ).toBe(false);
  });
});
