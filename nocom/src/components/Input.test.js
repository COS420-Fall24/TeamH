import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Input from "./Input";
import InputBox from "./InputBox";

// Mock InputBox component to test its integration
jest.mock("./InputBox", () => ({ name, className }) => (
  <input data-testid={name} className={className} />
));

const setup = () => {
  const utils = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/feedback" element={<div>Feedback Screen</div>} />
      </Routes>
    </MemoryRouter>
  );
  const codeInput = screen.getByTestId("Code");
  const contextInput = screen.getByTestId("Context");
  const submitButton = screen.getByRole("button", { name: /BreakDown/i });
  return {
    codeInput,
    contextInput,
    submitButton,
    ...utils,
  };
};

test("renders Input component with fields and button", () => {
  const { codeInput, contextInput, submitButton } = setup();
  expect(codeInput).toBeInTheDocument();
  expect(contextInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("allows input into the Code and Context fields", () => {
  const { codeInput, contextInput } = setup();
  fireEvent.change(codeInput, { target: { value: "Sample Code" } });
  fireEvent.change(contextInput, { target: { value: "Sample Context" } });
  expect(codeInput.value).toBe("Sample Code");
  expect(contextInput.value).toBe("Sample Context");
});

test("navigates to the Feedback screen on form submission", () => {
  const { codeInput, contextInput, submitButton } = setup();
  fireEvent.change(codeInput, { target: { value: "Sample Code" } });
  fireEvent.change(contextInput, { target: { value: "Sample Context" } });
  fireEvent.click(submitButton);
  expect(screen.getByText(/Feedback Screen/i)).toBeInTheDocument();
});
