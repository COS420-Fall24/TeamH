import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, Router } from "react-router-dom";
import LoginWidget from "./LoginWidget";
import Input from "./Input";

const setup = () => {
  const utils = render(
    <MemoryRouter>
      <Routes>
      <Route path="/" element={<LoginWidget/>} />
      <Route
          path="/app"
          element={
            <Input />
          }
        />
      </Routes>
    </MemoryRouter>
  );
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const submit = document.querySelector('button[type="Login"]');
  return {
    emailInput,
    passwordInput,
    submit,
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

test('This should check Input into fields', () => {
  const {emailInput,passwordInput} = setup()
  fireEvent.change(emailInput, {target: {value: '23'}})
  fireEvent.change(passwordInput, {target: {value: '23'}})
  expect(emailInput.value).toBe('23')
  expect(passwordInput.value).toBe('23')
})

test('This should check Input into fields', () => {
  const {emailInput,passwordInput,submit} = setup()
  fireEvent.change(emailInput, {target: {value: 'admin@example.com'}})
  fireEvent.change(passwordInput, {target: {value: 'password'}})
  fireEvent.click(submit)
  expect(document.body.textContent).toBe('BreakDown')
})

test('This should check Input into fields', () => {
  const {emailInput,passwordInput,submit} = setup()
  fireEvent.change(emailInput, {target: {value: 'admin@example.com'}})
  fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}})
  fireEvent.click(submit)
  expect(document.body.textContent).toBe('BreakDown')
})