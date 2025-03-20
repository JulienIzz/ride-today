import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { useState } from "react";
import Animated from "react-native-reanimated";

import { GeolocationToggle } from "#modules/location/components/GeolocationToggle";
import { useLocationInputContainerStyle } from "#modules/location/hooks/useLocationInputContainerStyle";
import { useSearchLocation } from "#modules/location/hooks/useSearchLocation";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const Location = () => {
  const theme = useTheme();

  const [isLocationEnabled, setLocationEnabled] = useState(false);

  const { locationInputContainerStyle, setTotalWidth, setSwitchWidth } =
    useLocationInputContainerStyle(isLocationEnabled);

  const { search, changeTextHandler, updateLocation } = useSearchLocation();

  const handleSwitch = () => {
    if (isLocationEnabled) {
      updateLocation(search);
    }
    setLocationEnabled(!isLocationEnabled);
  };

  return (
    <Container onLayout={setTotalWidth}>
      <LocationInputContainer style={locationInputContainerStyle}>
        <LocationInput
          placeholder={t`Search location`}
          value={search}
          onChangeText={changeTextHandler}
          cursorColor={theme.colors.primary}
          placeholderTextColor={theme.colors.contrastLight}
        />
      </LocationInputContainer>
      <SwitchContainer onLayout={setSwitchWidth}>
        <GeolocationToggle
          isLocationEnabled={isLocationEnabled}
          handleSwitch={handleSwitch}
        />
      </SwitchContainer>
    </Container>
  );
};

const Container = styled.View({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
});

const SwitchContainer = styled.View();

const LocationInputContainer = styled(Animated.View)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  padding: theme.spacings.xs,
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.borderRadius.round,
  boxShadow: shadowStyle,
}));

const LocationInput = styled.TextInput(({ theme }) => ({
  width: "100%",
  height: "100%",
  textAlign: "center",
  fontFamily: theme.fonts.regular,
  color: theme.colors.contrastLight,
  fontSize: 16,
}));
