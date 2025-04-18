import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { useState } from "react";

import { GeolocationToggle } from "#modules/location/components/GeolocationToggle";
import { useSearchLocation } from "#modules/location/hooks/useSearchLocation";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const Location = () => {
  const theme = useTheme();

  const [isLocationEnabled, setLocationEnabled] = useState(false);

  const { search, changeTextHandler, updateLocation } = useSearchLocation();

  const handleSwitch = () => {
    if (isLocationEnabled) {
      updateLocation(search);
    }
    setLocationEnabled(!isLocationEnabled);
  };

  return (
    <Container>
      <LocationInputContainer disabled={!isLocationEnabled}>
        <LocationInput
          placeholder={t`Search location`}
          value={search}
          editable={!isLocationEnabled}
          onChangeText={changeTextHandler}
          cursorColor={theme.colors.primary}
          placeholderTextColor={theme.colors.neutral[0]}
        />
      </LocationInputContainer>
      <GeolocationToggle
        isLocationEnabled={isLocationEnabled}
        handleSwitch={handleSwitch}
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: theme.spacings.m,
}));

const LocationInputContainer = styled.View<{ disabled: boolean }>(
  ({ theme, disabled }) => ({
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 40,
    paddingHorizontal: theme.spacings.m,
    opacity: disabled ? 1 : 0.4,
    backgroundColor: theme.colors.background.component,
    borderRadius: theme.borderRadius.round,
    boxShadow: shadowStyle,
  }),
);

const LocationInput = styled.TextInput(({ theme }) => ({
  width: "100%",
  height: "100%",
  textAlign: "left",
  fontFamily: theme.fonts.regular,
  color: theme.colors.neutral[0],
  fontSize: 16,
}));
