import { screen } from "@testing-library/react-native";

import { LocationDisplay } from "#modules/location/components/LocationDisplay";
import { renderWithProviders } from "#testing/render";

it("renders the LocationDisplay component", () => {
  renderWithProviders(<LocationDisplay />);

  expect(screen).toMatchComponentSnapshot();
});
