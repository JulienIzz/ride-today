export const MIN_APP_LAUNCHES_FOR_REVIEW_REQUEST = 2;

export const canRequestStoreReview = ({
  appLaunchCount,
  hasRequestedStoreReview,
}: {
  appLaunchCount: number;
  hasRequestedStoreReview: boolean;
}) =>
  !hasRequestedStoreReview &&
  appLaunchCount >= MIN_APP_LAUNCHES_FOR_REVIEW_REQUEST;
