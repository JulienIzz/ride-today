import { Logo } from "#modules/home/components/Logo";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/CurrentWeather";

export const Home = () => {
  return (
    <PageTemplate>
      <Logo />
      <Location />
      <Weather />
    </PageTemplate>
  );
};
