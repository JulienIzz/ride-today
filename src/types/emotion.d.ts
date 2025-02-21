/* eslint-disable @typescript-eslint/no-explicit-any */
import "@emotion/react";

import type { Theme as MyTheme } from "#design-system/theme/theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MyTheme {}
}
