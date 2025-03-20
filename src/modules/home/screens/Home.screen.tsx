import styled from "@emotion/native";

import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { Menu } from "#modules/home/components/Menu/Menu";
import { Location } from "#modules/location/components/Location";
import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/Weather";

export const Home = () => {
  return (
    <PageTemplate>
      <HomeGradients />
      <Container>
        <Logo />
        <Location />
        <LocationDisplay />
        <Weather />
      </Container>
      <Menu />
    </PageTemplate>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.spacings.m,
  gap: theme.spacings.m,
}));
