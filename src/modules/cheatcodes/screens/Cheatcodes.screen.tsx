import { Setting } from "#modules/settings/components/Setting";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
import { TopRightGradient } from "#shared/components/gradients/TopRightGradient";
import { PageTitleWithBack } from "#shared/components/PageTitleWithBack";
import { useMMKVDebugReactQuery } from "#shared/mmkv/useMMKV";

export const Cheatcodes = () => {
  const { isDebugReactQueryEnabled, setIsDebugReactQueryEnabled } =
    useMMKVDebugReactQuery();
  return (
    <SafePageTemplate>
      <TopRightGradient />
      <PageTitleWithBack title={"Cheatcodes"} />
      <Setting
        label={"Debug React Query"}
        value={isDebugReactQueryEnabled}
        onToggleValue={() => {
          setIsDebugReactQueryEnabled(!isDebugReactQueryEnabled);
        }}
        leftChoice={"Off"}
        rightChoice={"On"}
      />
    </SafePageTemplate>
  );
};
