import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sign-in button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/nefarious test/i);
  expect(buttonElement).toBeInTheDocument();
});
