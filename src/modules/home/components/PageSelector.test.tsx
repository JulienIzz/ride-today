import { screen } from "@testing-library/react-native";

import { PageSelector } from "#modules/home/components/PageSelector";
import { renderWithProviders } from "#testing/render";

it("renders the PageSelector component", () => {
  renderWithProviders(<PageSelector selectedPage={0} setPage={jest.fn} />);

  expect(screen).toMatchComponentSnapshot();
});
