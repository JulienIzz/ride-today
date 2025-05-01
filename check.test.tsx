import { screen } from "@testing-library/react-native";
import { Text, View } from "react-native";

import { renderWithProviders } from "#testing/render";

test("check jest setup", () => {
  expect(true).toBeTruthy();
});

it("finds rendered text", () => {
  renderWithProviders(
    <View>
      <Text>hello</Text>
    </View>,
  );

  expect(screen.getByText("hello")).toBeTruthy();
});
