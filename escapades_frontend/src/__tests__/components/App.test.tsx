import { render } from "@testing-library/react";
import App from "@/components/App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "@/provider/authProvider";

describe("<App />", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
  });
});
