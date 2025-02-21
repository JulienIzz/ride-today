import { Logo } from "#modules/home/components/Logo";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";

export const Home = () => {
  return (
    <PageTemplate>
      <Logo />
      <Location />
    </PageTemplate>
  );
};
