import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

const navigateTo = (route) => {
  window.history.pushState({}, "Test page", route);
};

test('renders LoginWidget at "/" route', () => {
  navigateTo("/");
  render(<App />);
  expect(screen.getByText(/Please Login below!/i)).toBeInTheDocument();
});

test('renders Account and Input at "/app" route', () => {
  navigateTo("/app");
  render(<App />);
  expect(screen.getByText(/Account/i)).toBeInTheDocument();
});
<<<<<<< HEAD
=======

test('renders Account and Feedback at "/feedback" route', () => {
  navigateTo("/feedback");
  render(<App />);
  expect(screen.getByText(/Account/i)).toBeInTheDocument();
});
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
