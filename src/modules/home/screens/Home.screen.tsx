import { Logo } from "#modules/home/components/Logo";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { CurrentWeather } from "#modules/weather/components/CurrentWeather";

export const Home = () => {
  return (
    <PageTemplate>
      <Logo />
      <Location />
      <CurrentWeather />
    </PageTemplate>
  );
};
