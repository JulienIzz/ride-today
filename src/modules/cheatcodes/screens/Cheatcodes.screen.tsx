import styled from "@emotion/native";

import { Setting } from "#modules/settings/components/Setting";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { SafePageTemplate } from "#shared/components/PageTemplate";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { useMMKVDebugReactQuery } from "#shared/mmkv/useMMKV";

export const Cheatcodes = () => {
  const { isDebugReactQueryEnabled, setIsDebugReactQueryEnabled } =
    useMMKVDebugReactQuery();
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
      </Container>
    </SafePageTemplate>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacings.m,
  gap: theme.spacings.m,
}));
