import styled from "@emotion/native";
import { useState } from "react";
import { TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { useLocationStore } from "#modules/location/hooks/useLocationStore.hook";

export const SearchedLocation = () => {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [search, setSearch] = useState("");

  const debouncedSetLocation = useDebouncedCallback((value: string) => {
    setLocation(value);
  }, 500);

  const handleChangeText = (value: string) => {
    setSearch(value);
    debouncedSetLocation(value);
  };

  return (
    <Container>
      <LocationInput
        placeholder="Search location"
        value={search}
        onChangeText={handleChangeText}
      />
      <LocationDisplay />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacings.s,
}));

const LocationInput = styled(TextInput)(({ theme }) => ({
  width: 200,
  justifyContent: "center",
  textAlign: "center",
  fontFamily: theme.fonts.body,
  padding: theme.spacings.xs,
  backgroundColor: theme.colors.lightGray,
  borderRadius: theme.borderRadius.xl,
}));
