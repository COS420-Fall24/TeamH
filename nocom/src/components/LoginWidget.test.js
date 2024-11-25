import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginWidget from "./LoginWidget";

const setup = () => {
  const utils = render(
    <MemoryRouter>
      <LoginWidget />
    </MemoryRouter>
  );
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  return {
    emailInput,
    passwordInput,
    ...utils,
  }
}

test("renders login form with title, email, password inputs, and submit button", () => {
  const {emailInput,passwordInput} = setup()
  expect(screen.getByText(/NoCom/i)).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

