import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Home from "@/pages/Home/Home";

describe("<Home />", () => {
  it("matches last screenshot", () => {
    const tree = renderer.create(<Home />);
    expect(tree).toMatchSnapshot();
  });

  it("should have title message visible", () => {
    render(<Home />);
    const title = screen.queryByText(/Your next trip is waiting for you/);
    expect(title).toBeVisible();
  });
});
