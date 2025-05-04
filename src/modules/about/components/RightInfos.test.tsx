import { screen } from "@testing-library/react-native";

import { RightInfos } from "#modules/about/components/RightInfos";
import { renderWithProviders } from "#testing/render";

it("renders the RightInfos component", () => {
  renderWithProviders(<RightInfos />);

  expect(screen).toMatchComponentSnapshot();
});
