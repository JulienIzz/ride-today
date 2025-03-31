import { isWeb } from "#app/_layout";
import { Cheatcodes } from "#modules/cheatcodes/screens/Cheatcodes.screen";
import { Unavailable } from "#shared/web/components/Unavailable";

export default function Index() {
  if (isWeb) return <Unavailable />;
  return <Cheatcodes />;
}
