import { render, screen } from "@testing-library/react-native";
import { Text, View } from "react-native";

test("check jest setup", () => {
  expect(true).toBeTruthy();
});

it("finds rendered text", () => {
  render(
    <View>
      <Text>hello</Text>
    </View>,
  );

  expect(screen.getByText("hello")).toBeTruthy();
});
