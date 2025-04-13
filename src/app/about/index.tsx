import { isWeb } from "#app/_layout";
import { About } from "#modules/about/components/About";
import { Unavailable } from "#shared/web/components/Unavailable";

export default function Index() {
  if (isWeb) return <Unavailable />;
  return <About />;
}
