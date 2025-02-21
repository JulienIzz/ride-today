import styled from "@emotion/native";
import { useState } from "react";
import { TextInput } from "react-native";
import { useDebounce } from "use-debounce";

import { CurrentLocation } from "#modules/location/components/CurrentLocation";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const SearchedLocation = () => {
  const [search, setSearch] = useState("Massy");
  const [debouncedSearch] = useDebounce(search, 500);

  return (
    <Container>
      <LocationInput
        placeholder="Search location"
        value={search}
        onChangeText={setSearch}
      />
      <QueryErrorBoundary>
        <CurrentLocation location={debouncedSearch} />
      </QueryErrorBoundary>
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
