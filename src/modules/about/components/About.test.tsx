import { screen } from "@testing-library/react-native";

import { About } from "#modules/about/components/About";
import { renderWithProviders } from "#testing/render";

it("renders the About component", () => {
  renderWithProviders(<About />);

  expect(screen).toMatchSnapshot();
});
