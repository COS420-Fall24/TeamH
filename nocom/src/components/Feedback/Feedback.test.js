import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Feedback from "./Feedback";

// Mock useLocation and useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

// Mock OpenAI
const mockCreate = jest.fn();
jest.mock("openai", () => ({
  OpenAI: function() {
    return {
      chat: {
        completions: {
          create: mockCreate
        }
      }
    };
  }
}));

// Mock window.prompt
const mockPrompt = jest.spyOn(window, 'prompt').mockImplementation(() => 'test-api-key');

const mockNavigate = jest.fn();

describe("Feedback Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockCreate.mockClear();
    mockPrompt.mockClear();
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: "Test Response" } }]
    });
  });

  afterAll(() => {
    mockPrompt.mockRestore();
  });

  test("renders no feedback message when state is null", () => {
    useLocation.mockReturnValue({ state: null });
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    expect(screen.getByText(/No feedback data available/i)).toBeInTheDocument();
  });

  test("renders feedback data when state is provided", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        context: "Test Context",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const textareas = screen.getAllByRole('textbox');
    expect(textareas[0]).toHaveValue("Test Code");
    expect(textareas[1]).toHaveValue("Test Explanation");
    expect(textareas[2]).toHaveAttribute('placeholder', 'Test Chat');
  });

  test("navigates back when Go Back button is clicked", () => {
    useLocation.mockReturnValue({ state: null });
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /Go Back/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("handles form submission with empty code input", async () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', { name: /feedback form/i });
    const textboxes = screen.getAllByRole('textbox');
    const codeInput = textboxes.find(input => input.getAttribute('name') === 'Code');
    fireEvent.change(codeInput, { target: { value: "" } });

    await act(async () => {
      fireEvent.submit(form);
    });

    // Check for error message with exact text including period
    await waitFor(() => {
      const errorDiv = screen.getByText("Chat input cannot be empty.");
      expect(errorDiv).toBeInTheDocument();
      expect(errorDiv).toHaveClass('error');
    });
  });

  test("handles form submission with valid input", async () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    // Mock successful API response
    mockCreate.mockResolvedValue({
      choices: [{ 
        message: { 
          content: "AI Response\n### Suggested Links:\n[Link](http://example.com)" 
        } 
      }]
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', { name: /feedback form/i });
    const chatInput = screen.getByPlaceholderText("Test Chat");
    fireEvent.change(chatInput, { target: { value: "New question" } });

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/feedback", expect.objectContaining({
        state: expect.objectContaining({
          code: "Test Code",
          explanation: "Test Explanation",
          chat: expect.stringContaining("Test Chat"),
          links: expect.any(String)
        })
      }));
    });
  });

  test("handles API error", async () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    // Mock OpenAI to throw an error
    mockCreate.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', { name: /feedback form/i });
    const chatInput = screen.getByPlaceholderText("Test Chat");
    fireEvent.change(chatInput, { target: { value: "New question" } });

    await act(async () => {
      fireEvent.submit(form);
    });

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/i)).toBeInTheDocument();
    });
  });

  test("handles empty state values", () => {
    useLocation.mockReturnValue({
      state: {
        code: "",
        explanation: "",
        links: "No links provided",
        chat: ""
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Check for form presence
    expect(screen.getByRole('form', { name: /feedback form/i })).toBeInTheDocument();
  });

  test("handles missing state values", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "",
        links: "No links provided",
        chat: ""
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Check for form presence
    expect(screen.getByRole('form', { name: /feedback form/i })).toBeInTheDocument();
  });

  test("parses markdown links correctly", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "[Link 1](http://example1.com)\n[Link 2](http://example2.com)",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'http://example1.com');
    expect(links[0]).toHaveTextContent('Link 1');
    expect(links[1]).toHaveAttribute('href', 'http://example2.com');
    expect(links[1]).toHaveTextContent('Link 2');
  });

  test("handles undefined state values", () => {
    useLocation.mockReturnValue({
      state: undefined
    });
    // ... test implementation
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );    
  });

  test("handles chat history updates", () => {
    // Test the chat history functionality
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });
  });



  test("back button navigates to previous page", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /Go Back/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("handles malformed response format", async () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Response without explanation section" } }]
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const form = screen.getByRole('form', { name: /feedback form/i });
    const chatInput = screen.getByPlaceholderText("Test Chat");
    fireEvent.change(chatInput, { target: { value: "New question" } });

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/feedback", expect.objectContaining({
        state: expect.objectContaining({
          chat: expect.stringContaining("New question"),
          explanation: expect.any(String),
          links: "No links provided"
        })
      }));
    });
  });

});

describe("Link Parsing", () => {
  test("parses markdown links correctly", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "[Link 1](http://example1.com)\n[Link 2](http://example2.com)",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'http://example1.com');
    expect(links[0]).toHaveTextContent('Link 1');
    expect(links[1]).toHaveAttribute('href', 'http://example2.com');
    expect(links[1]).toHaveTextContent('Link 2');
  });

  test("handles links with special characters", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "[Complex Link!@#](https://test.com/path?q=123)\n[Link & More](http://example.com/path#fragment)",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://test.com/path?q=123');
    expect(links[0]).toHaveTextContent('Complex Link!@#');
    expect(links[1]).toHaveAttribute('href', 'http://example.com/path#fragment');
    expect(links[1]).toHaveTextContent('Link & More');
  });

  test("handles no links gracefully", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "No links provided",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  test("ignores malformed links", () => {
    useLocation.mockReturnValue({
      state: {
        code: "Test Code",
        explanation: "Test Explanation",
        links: "[Broken Link](http://example.com\n[Valid Link](http://valid.com)",
        chat: "Test Chat"
      }
    });

    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'http://valid.com');
    expect(links[0]).toHaveTextContent('Valid Link');
  });
});
