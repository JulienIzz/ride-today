import { Logo } from "#modules/home/components/Logo";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";

export default function Index() {
  return (
    <PageTemplate>
      <Logo />
      <Location />
    </PageTemplate>
  );
}
