import { useState } from "react";

import { useCustomFonts } from "#shared/fonts/useCustomFonts.hook";

export const useAppIsReady = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { fontsLoaded } = useCustomFonts();

  if (!appIsReady && fontsLoaded) {
    setAppIsReady(true);
  }

  return { appIsReady };
};
