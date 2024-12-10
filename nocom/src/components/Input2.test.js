import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Input from "./Input";


beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

test("Give error when no key is entered", async () => {
  render(
    <MemoryRouter>
      <Input />
    </MemoryRouter>
  );


  fireEvent.change(screen.getByPlaceholderText(/Enter your code here/i), {
    target: { value: "Sample Code" },
  });

  fireEvent.click(screen.getByRole("button", { name: /BreakDown/i }))
    
  expect(console.error).toHaveBeenCalled();
});

