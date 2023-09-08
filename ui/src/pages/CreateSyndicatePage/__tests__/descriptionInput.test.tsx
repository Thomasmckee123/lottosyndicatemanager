import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DescriptionInput from "../components/DescriptionInput";
import { TextField } from "@mui/material";

describe("descriptionInput", () => {
  it("renders the logo", () => {
    const setValue = vi.fn();
    render(<DescriptionInput value={"description"} setValue={setValue} />);
    expect(screen.getByTestId("description-input-box")).contains(
      <TextField></TextField>
    );
  });
});
