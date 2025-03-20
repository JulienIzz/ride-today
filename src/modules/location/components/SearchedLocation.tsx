import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useDebouncedCallback } from "use-debounce";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";
import { shadowStyle } from "#shared/styling/shadowStyle";

export const SearchedLocation = () => {
  const theme = useTheme();

  const {
    location,
    setLocation,
    searchedLocation,
    setSearchedLocation,
    clearLocation,
  } = useLocationStore((state) => state);

  const [search, setSearch] = useState(searchedLocation ?? undefined);

  const debouncedSetLocation = useDebouncedCallback((value: string) => {
    setSearchedLocation(value);

    if (value === "") {
      clearLocation();
      return;
    }

    setLocation(value);
  }, 500);

  const handleChangeText = (value: string) => {
    setSearch(value);
    debouncedSetLocation(value);
  };

  useEffect(() => {
    if (searchedLocation) {
      setLocation(searchedLocation);
    }
  }, [setLocation, search, searchedLocation]);

  return (
    <Container entering={FadeInUp}>
      <LocationInputContainer>
        <LocationInput
          placeholder={t`Search location`}
          value={search}
          onChangeText={handleChangeText}
          cursorColor={theme.colors.primary}
          placeholderTextColor={theme.colors.contrastLight}
        />
      </LocationInputContainer>
      <QueryErrorBoundary
        errorFallback={<LocationError />}
        resetKeys={[location]}
      >
        <LocationDisplay />
      </QueryErrorBoundary>
    </Container>
  );
};

const LocationError = () => {
  return (
    <ErrorContainer>
      <X color="red" />
      <Spacer size={4} horizontal />
      <ContrastLightTypography variant="P1" text={t`Unable to find location`} />
    </ErrorContainer>
  );
};

const Container = styled(Animated.View)(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacings.s,
}));

const LocationInputContainer = styled.View(({ theme }) => ({
  width: 300,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacings.xs,
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.borderRadius.round,
  fontSize: 16,
  boxShadow: shadowStyle,
}));

const LocationInput = styled(TextInput)(({ theme }) => ({
  width: "100%",
  height: "100%",
  textAlign: "center",
  fontFamily: theme.fonts.regular,
  color: theme.colors.contrastLight,
  fontSize: 16,
}));

const ErrorContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

const ContrastLightTypography = styled(Typography)(({ theme }) => ({
  color: theme.colors.contrastLight,
}));
