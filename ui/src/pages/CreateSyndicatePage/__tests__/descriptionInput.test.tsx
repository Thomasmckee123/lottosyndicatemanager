import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DescriptionInput from "../components/DescriptionInput";
import { TextField } from "@mui/material";

describe("descriptionInput", () => {
  it("renders description input", () => {
    const setValue = vi.fn();
    render(<DescriptionInput value={"description"} setValue={setValue} />);

    expect(screen.getByRole("textbox")).toBeTruthy();
  });
});
