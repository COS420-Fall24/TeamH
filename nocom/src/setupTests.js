import "@testing-library/jest-dom";

beforeAll(() => {
  window.alert = jest.fn();
  window.prompt = jest.fn(() => "Mock API Key");
  jest.spyOn(console, "warn").mockImplementation((message) => {
    if (
      message.includes("React Router Future Flag Warning") ||
      message.includes("Relative route resolution")
    ) {
      return;
    }
    console.warn(message);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
