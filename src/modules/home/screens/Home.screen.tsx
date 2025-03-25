import styled from "@emotion/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { Menu } from "#modules/home/components/Menu/Menu";
import { Location } from "#modules/location/components/Location";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/Weather";
import { Divider } from "#shared/components/Divider";

export const Home = () => {
  return (
    <PageTemplate>
      <HomeGradients />
      <LocationContainer>
        <Logo />
        <Location />
        <LocationDisplay />
      </LocationContainer>
      <Divider />
      <Weather />
      <Menu />
    </PageTemplate>
  );
};

const LocationContainer = styled.View(({ theme }) => {
  const { top } = useSafeAreaInsets();
  return {
    padding: theme.spacings.m,
    paddingTop: top ? top : theme.spacings.m,
    gap: theme.spacings.m,
  };
});
