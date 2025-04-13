import { isWeb } from "#app/_layout";
import { Settings } from "#modules/settings/components/SettingsList";
import { Unavailable } from "#shared/web/components/Unavailable";

export default function Index() {
  if (isWeb) return <Unavailable />;
  return <Settings />;
}
