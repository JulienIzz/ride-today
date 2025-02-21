import styled from "@emotion/native";
import { X } from "lucide-react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { useDebounce } from "use-debounce";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { Spacer } from "#shared/components/Spacer";
import { Typography } from "#shared/fonts/Typography";
import { QueryErrorBoundary } from "#shared/infra/boundaries/QueryBoundary";

export const SearchedLocation = () => {
  const [search, setSearch] = useState("Nice");
  const [debouncedSearch] = useDebounce(search, 500);

  return (
    <Container>
      <LocationInput
        placeholder="Search location"
        value={search}
        onChangeText={setSearch}
      />
      <QueryErrorBoundary
        errorFallback={<LocationError />}
        resetKeys={[debouncedSearch]}
      >
        <LocationDisplay location={debouncedSearch} />
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

export const LocationError = () => {
  return (
    <ErrorContainer>
      <X color="red" size={14} />
      <Spacer size={4} horizontal />
      <Typography variant="body" text={"Unable to find location, try again"} />
    </ErrorContainer>
  );
};

const ErrorContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});
