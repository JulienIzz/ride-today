import { isWeb } from "#app/_layout";
import { Credits } from "#modules/credits/screens/Credits.screen";
import { Unavailable } from "#shared/web/components/Unavailable";

export default function Index() {
  if (isWeb) return <Unavailable />;
  return <Credits />;
}
