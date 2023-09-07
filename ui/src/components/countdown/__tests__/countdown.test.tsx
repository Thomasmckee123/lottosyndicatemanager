import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
describe("Resonate Logo", () => {
  it("renders the logo", () => {
    render(<BrowserRouter>
    <ResonateLogo />
    <BrowserRouter></>);
    expect(screen.getByRole("link")).toBe("href", "/dashboard");
  });
});
