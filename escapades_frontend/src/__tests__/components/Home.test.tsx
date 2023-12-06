import { render, screen } from "@testing-library/react";
import Home from "@/components/Home/Home";

describe("<Home />", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });

  it("should have title message visible", () => {
    render(<Home />);
    const title = screen.queryByText(/Your next trip is waiting for you/)
    expect(title).toBeVisible();
  });
});
