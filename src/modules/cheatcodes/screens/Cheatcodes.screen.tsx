import styled from "@emotion/native";

import { Button } from "#design-system/components/Button/Button";
import { MMKVPreview } from "#modules/cheatcodes/components/MMKVPreview";
import { Setting } from "#modules/settings/components/Setting";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { SafePageTemplate } from "#shared/components/PageTemplate";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import {
  useMMKVDebugReactQuery,
  useMMKVStoreReview,
} from "#shared/mmkv/useMMKV";

export const Cheatcodes = () => {
  const { isDebugReactQueryEnabled, setIsDebugReactQueryEnabled } =
    useMMKVDebugReactQuery();
  const { hasRequestedStoreReview, setHasRequestedStoreReview } =
    useMMKVStoreReview();
  return (
    <SafePageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={"Cheatcodes"} />
      <Container>
        <Setting
          label={"Debug R-Query"}
          value={isDebugReactQueryEnabled}
          onToggleValue={() => {
            setIsDebugReactQueryEnabled(!isDebugReactQueryEnabled);
          }}
          leftChoice={"Off"}
          rightChoice={"On"}
        />
        <Button
          title={"Reset review request"}
          disabled={!hasRequestedStoreReview}
          onPress={() => {
            setHasRequestedStoreReview(false);
          }}
        />
        <MMKVPreview />
      </Container>
    </SafePageTemplate>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));
