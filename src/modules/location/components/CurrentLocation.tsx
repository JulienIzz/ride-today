import styled from "@emotion/native";
import { MapPin } from "lucide-react-native";

import { useCurrentWeather } from "#modules/weather/hooks/useCurrentWeather.query";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";

export const CurrentLocation = ({ location }: { location: string }) => {
  const { currentLocation } = useCurrentWeather(location);

  return (
    <Container>
      <MapPin color="black" size={14} />
      <Spacer size={4} horizontal />
      <Typography variant="body" text={`${currentLocation.name}, `} />
      <Typography variant="body" text={`${currentLocation.region}, `} />
      <Typography variant="body" text={`${currentLocation.country}`} />
    </Container>
  );
};

const Container = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
