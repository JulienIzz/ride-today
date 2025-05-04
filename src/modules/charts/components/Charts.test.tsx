import { screen } from "@testing-library/react-native";

import { Charts } from "#modules/charts/components/Charts";
import { renderWithProviders } from "#testing/render";

it("renders the Charts component", () => {
  renderWithProviders(<Charts />);

  expect(screen).toMatchComponentSnapshot();
});
