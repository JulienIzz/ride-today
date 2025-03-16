import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { t } from "@lingui/core/macro";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useDebouncedCallback } from "use-debounce";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";

export const SearchedLocation = () => {
  const theme = useTheme();

  const setLocation = useLocationStore((state) => state.setLocation);
  const setSearchedLocation = useLocationStore(
    (state) => state.setSearchedLocation,
  );
  const searchedLocation = useLocationStore((state) => state.searchedLocation);
  const clearLocation = useLocationStore((state) => state.clearLocation);

  const [search, setSearch] = useState(searchedLocation ?? undefined);

  const debouncedSetLocation = useDebouncedCallback((value: string) => {
    if (value === "") {
      clearLocation();
      return;
    }

    setLocation(value);
  }, 500);

  const handleChangeText = (value: string) => {
    setSearch(value);
    setSearchedLocation(value);
    debouncedSetLocation(value);
  };

  useEffect(() => {
    if (searchedLocation) {
      setLocation(searchedLocation);
    }
  }, [setLocation, search, searchedLocation]);

  return (
    <Container entering={FadeInUp}>
      <LocationInput
        placeholder={t`Search location`}
        value={search}
        onChangeText={handleChangeText}
        cursorColor={theme.colors.primary}
        placeholderTextColor={theme.colors.contrastLight}
      />
      <LocationDisplay />
    </Container>
  );
};

const Container = styled(Animated.View)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.s,
}));

const LocationInput = styled(TextInput)(({ theme }) => ({
  width: 300,
  height: 44,
  justifyContent: "center",
  textAlign: "center",
  fontFamily: theme.fonts.body,
  padding: theme.spacings.xs,
  backgroundColor: theme.colors.componentBackground,
  borderRadius: theme.borderRadius.round,
  color: theme.colors.contrastLight,
  fontSize: 16,
}));
