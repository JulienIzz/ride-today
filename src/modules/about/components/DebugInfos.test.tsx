import { screen } from "@testing-library/react-native";

import { DebugInfos } from "#modules/about/components/DebugInfos";
import { renderWithProviders } from "#testing/render";

it("renders the DebugInfos component", () => {
  renderWithProviders(<DebugInfos />);

  expect(screen).toMatchComponentSnapshot();
});
