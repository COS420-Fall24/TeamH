import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputBox from "./InputBox";

// Utility function to render InputBox for tests
const setup = (props = {}) => {
  const utils = render(<InputBox {...props} />);
  const textarea = screen.getByRole("textbox");
  return { textarea, ...utils };
};

test("inserts a tab character at the beginning of the line when the Tab key is pressed", async () => {
  const { textarea } = setup();
  fireEvent.change(textarea, { target: { value: "Line 1\nLine 2" } });

  // Set cursor position to the start of 'Line 2'
  textarea.selectionStart = 7;
  textarea.selectionEnd = 7;

  fireEvent.keyDown(textarea, { key: "Tab" });

  // Wait for async changes caused by `setTimeout`
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(textarea.value).toBe("Line 1\n\tLine 2"); // Tab at the start of 'Line 2'
  expect(textarea.selectionStart).toBe(8); // Cursor after the inserted Tab
  expect(textarea.selectionEnd).toBe(8);
});

test("inserts a tab character at the beginning of the current line when the Tab key is pressed", async () => {
  const { textarea } = setup();
  fireEvent.change(textarea, { target: { value: "Line 1\nLine 2" } });

  // Set cursor position to the middle of 'Line 2'
  textarea.selectionStart = 9;
  textarea.selectionEnd = 9;

  fireEvent.keyDown(textarea, { key: "Tab" });

  // Wait for async changes caused by `setTimeout`
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(textarea.value).toBe("Line 1\n\tLine 2"); // Tab still added at the start of 'Line 2'
  expect(textarea.selectionStart).toBe(10); // Cursor adjusted to match the behavior
  expect(textarea.selectionEnd).toBe(10);
});
test("does nothing when a non-Tab key is pressed", async () => {
  const { textarea } = setup();
  fireEvent.change(textarea, { target: { value: "Line 1\nLine 2" } });

  textarea.selectionStart = 7;
  textarea.selectionEnd = 7;

  fireEvent.keyDown(textarea, { key: "Enter" }); // Non-Tab key

  expect(textarea.value).toBe("Line 1\nLine 2"); // Value should remain unchanged
});

test("inserts a tab character at the start when no newline exists", async () => {
  const { textarea } = setup();
  fireEvent.change(textarea, { target: { value: "Line 1 Line 2" } });

  textarea.selectionStart = 0;
  textarea.selectionEnd = 0;

  fireEvent.keyDown(textarea, { key: "Tab" });

  // Wait for async changes caused by `setTimeout`
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(textarea.value).toBe("\tLine 1 Line 2"); // Tab at the very start
  expect(textarea.selectionStart).toBe(1); // Cursor after the inserted Tab
  expect(textarea.selectionEnd).toBe(1);
});

test("handles edge case when cursor is at the beginning of the text", async () => {
  const { textarea } = setup();
  fireEvent.change(textarea, { target: { value: "Line 1" } });

  textarea.selectionStart = 0;
  textarea.selectionEnd = 0;

  fireEvent.keyDown(textarea, { key: "Tab" });

  // Wait for async changes caused by `setTimeout`
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(textarea.value).toBe("\tLine 1"); // Tab at the start
  expect(textarea.selectionStart).toBe(1); // Cursor after the inserted Tab
  expect(textarea.selectionEnd).toBe(1);
});
