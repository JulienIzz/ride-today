import { Logo } from "#modules/home/components/Logo";
import { CurrentLocation } from "#modules/location/components/CurrentLocation";
import { SearchedLocation } from "#modules/location/components/SearchedLocation";
import { PageTemplate } from "#modules/templates/components/PageTemplate";

export default function Index() {
  return (
    <PageTemplate>
      <Logo />
      <CurrentLocation location="Massy" />
      <SearchedLocation />
    </PageTemplate>
  );
}
