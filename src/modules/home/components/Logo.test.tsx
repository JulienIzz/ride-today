import { screen } from "@testing-library/react-native";

import { Logo } from "#modules/home/components/Logo";
import { renderWithProviders } from "#testing/render";

it("renders the Logo component", () => {
  renderWithProviders(<Logo />);

  expect(screen).toMatchComponentSnapshot();
});
