import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginWidget from "./LoginWidget";

test("renders login form with title, email, password inputs, and submit button", () => {
  render(
    <MemoryRouter>
      <LoginWidget />
    </MemoryRouter>
  );

  // Check for the title
  expect(screen.getByText(/NoCom/i)).toBeInTheDocument();

  // Select the email input by type attribute using querySelector
  const emailInput = document.querySelector('input[type="email"]');
  expect(emailInput).toBeInTheDocument();

  // Select the password input by type attribute using querySelector
  const passwordInput = document.querySelector('input[type="password"]');
  expect(passwordInput).toBeInTheDocument();

  // Check for the submit button
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});
