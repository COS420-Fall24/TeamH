import React from "react";
import { render, screen } from "@testing-library/react";
import Feedback from "./Feedback";

describe("Feedback Component", () => {
  test("renders Feedback component with input boxes", () => {
    render(<Feedback />);

    // Assert that the input boxes are present
    const codeInput = screen.getByPlaceholderText(/Code/i);
    const explanationInput = screen.getByPlaceholderText(/Explanation/i);
    const screenInput = screen.getByPlaceholderText(/Screen/i);

    expect(codeInput).toBeInTheDocument();
    expect(explanationInput).toBeInTheDocument();
    expect(screenInput).toBeInTheDocument();
  });
});
