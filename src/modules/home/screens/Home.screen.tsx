import styled from "@emotion/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeGradients } from "#modules/home/components/HomeGradient";
import { Logo } from "#modules/home/components/Logo";
import { Menu } from "#modules/home/components/Menu/Menu";
import { Location } from "#modules/location/components/Location";
import { PageTemplate } from "#modules/templates/components/PageTemplate";
import { Weather } from "#modules/weather/components/Weather";

export const Home = () => {
  return (
    <PageTemplate>
      <HomeGradients />
      <Container>
        <Logo />
        <Location />
        <Weather />
      </Container>
      <Menu />
    </PageTemplate>
  );
};

const Container = styled.View(({ theme }) => {
  const { top } = useSafeAreaInsets();
  return {
    flex: 1,
    paddingHorizontal: theme.spacings.m,
    paddingBottom: theme.spacings.m,
    paddingTop: top ? 0 : theme.spacings.m,
    gap: theme.spacings.m,
  };
});
