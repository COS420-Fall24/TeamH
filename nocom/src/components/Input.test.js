import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Input from "./Input";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockCreate = jest.fn();
jest.mock("openai", () => ({
  OpenAI: function () {
    return {
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    };
  },
}));

const mockPrompt = jest.spyOn(window, "prompt").mockImplementation(() => "mock-api-key");

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  mockNavigate.mockClear();
  mockCreate.mockClear();
  mockPrompt.mockClear();
  mockCreate.mockResolvedValue({
    choices: [{ 
      message: { 
        content: "### Explanation:\nMocked AI Response\n### Suggested Links:\n[Example Link](http://example.com)" 
      } 
    }],
  });
});

afterEach(() => {
  console.error.mockRestore();
});

test("renders Input component with fields and button", () => {
  render(
    <MemoryRouter>
      <Input />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/Enter your code here/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter additional context here/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /BreakDown/i })).toBeInTheDocument();
});

test("shows error when Code input is empty", async () => {
  render(
    <MemoryRouter>
      <Input />
    </MemoryRouter>
  );

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /BreakDown/i }));
  });

  expect(screen.getByText(/Code input cannot be empty/i)).toBeInTheDocument();
});

test("navigates to feedback page with valid response", async () => {
  render(
    <MemoryRouter>
      <Input />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter your code here/i), {
    target: { value: "Sample Code" },
  });

  await act(async () => {
    fireEvent.submit(screen.getByRole("form"));
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/feedback", {
      state: {
        code: "Sample Code",
        context: "",
        chat: "Chat:",
        explanation: "### Explanation:\nMocked AI Response",
        links: "[Example Link](http://example.com)"
      }
    });
  });
});

test("handles response with sections", async () => {
  render(
    <MemoryRouter>
      <Input />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter your code here/i), {
    target: { value: "Sample Code" },
  });

  // Mock response with sections
  mockCreate.mockResolvedValueOnce({
    choices: [{ 
      message: { 
        content: "### Explanation:\nTest explanation\n### Suggested Links:\n[Link](http://test.com)" 
      } 
    }]
  });

  await act(async () => {
    fireEvent.submit(screen.getByRole("form"));
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/feedback", {
      state: {
        code: "Sample Code",
        context: "",
        chat: "Chat:",
        explanation: "### Explanation:\nTest explanation",
        links: "[Link](http://test.com)"
      }
    });
  });
});

test("handles response without sections", async () => {
  render(
    <MemoryRouter>
      <Input />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter your code here/i), {
    target: { value: "Sample Code" },
  });

  // Mock response without sections
  mockCreate.mockResolvedValueOnce({
    choices: [{ 
      message: { 
        content: "Plain response without sections" 
      } 
    }]
  });

  await act(async () => {
    fireEvent.submit(screen.getByRole("form"));
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/feedback", {
      state: {
        code: "Sample Code",
        context: "",
        chat: "Chat:",
        explanation: "Plain response without sections",
        links: "No links provided"
      }
    });
  });
});
