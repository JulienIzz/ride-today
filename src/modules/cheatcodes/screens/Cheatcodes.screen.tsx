import { useTheme } from "@emotion/react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

import { absoluteFillStyle } from "#design-system/utils/absoluteFillStyle";
import { Setting } from "#modules/settings/components/Setting";
import { SafePageTemplate } from "#modules/templates/components/PageTemplate";
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

const TopRightGradient = () => {
  const { width, height } = Dimensions.get("screen");
  const theme = useTheme();
  return (
    <Canvas style={absoluteFillStyle}>
      <Rect opacity={0.2} x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(width, 0)}
          end={vec(width - 250, 100)}
          colors={[theme.colors.primary, "transparent"]}
        />
      </Rect>
    </Canvas>
  );
};
