import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useMMKVListener } from "react-native-mmkv";

import { Typography } from "#shared/fonts/Typography";
import { storage, StorageKeys } from "#shared/mmkv/store";

// MMKV encodes booleans and numbers identically, so the stored type cannot
// be probed reliably (getBoolean(1) === true). Declare the type of each key
// instead; TypeScript enforces this map stays in sync with StorageKeys.
const storageKeyTypes: Record<StorageKeys, "string" | "number" | "boolean"> = {
  [StorageKeys.IS_IMPERIAL_ENABLED]: "boolean",
  [StorageKeys.IS_CUSTOM_THEME_ENABLED]: "boolean",
  [StorageKeys.CUSTOM_THEME]: "string",
  [StorageKeys.HAS_READ_ONBOARDING]: "boolean",
  [StorageKeys.IS_DEBUG_REACT_QUERY_ENABLED]: "boolean",
  [StorageKeys.APP_LAUNCH_COUNT]: "number",
  [StorageKeys.HAS_REQUESTED_STORE_REVIEW]: "boolean",
};

const readStoredValue = (key: string): string => {
  switch (storageKeyTypes[key as StorageKeys]) {
    case "string":
      return `"${storage.getString(key)}"`;
    case "boolean":
      return String(storage.getBoolean(key));
    case "number":
      return String(storage.getNumber(key));
    default: {
      const stringValue = storage.getString(key);
      if (stringValue !== undefined) return `"${stringValue}"`;
      return String(
        storage.getNumber(key) ?? storage.getBoolean(key) ?? "<buffer>",
      );
    }
  }
};

const readAllEntries = () =>
  storage
    .getAllKeys()
    .sort()
    .map((key) => ({ key, value: readStoredValue(key) }));

export const MMKVPreview = () => {
  const theme = useTheme();

  const [entries, setEntries] = useState(readAllEntries);

  useMMKVListener(() => {
    setEntries(readAllEntries());
  }, storage);

  return (
    <Container>
      <Typography
        variant="H4"
        color={theme.colors.neutral[0]}
        bold
        text={"MMKV storage"}
      />
      {entries.length === 0 && (
        <Typography
          variant="P2"
          color={theme.colors.neutral[0]}
          text={"Empty"}
        />
      )}
      {entries.map(({ key, value }) => (
        <Row key={key}>
          <Typography variant="P2" color={theme.colors.neutral[0]} text={key} />
          <ValueText
            variant="P2"
            color={theme.colors.neutral[0]}
            bold
            text={value}
          />
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  gap: theme.spacings.s,
  borderRadius: theme.borderRadius.m,
  padding: theme.spacings.m,
  backgroundColor: theme.colors.background.component,
}));

const Row = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacings.m,
}));

const ValueText = styled(Typography)({
  flexShrink: 1,
  textAlign: "right",
});
