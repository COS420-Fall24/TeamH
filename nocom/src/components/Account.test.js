import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Account from "./Account";

describe("Account Component", () => {
  it("renders the Account button", () => {
    render(<Account />);
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
  });

  it("toggles the dropdown menu visibility on button click", () => {
    render(<Account />);

    // Dropdown should not be visible initially
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();

    // Click the Account button to open the dropdown
    fireEvent.click(screen.getByText(/Account/i));
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();

    // Click the Account button again to close the dropdown
    fireEvent.click(screen.getByText(/Account/i));
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });

  it("contains the correct links in the dropdown menu", () => {
    render(<Account />);

    // Open the dropdown
    fireEvent.click(screen.getByText(/Account/i));

    // Check for the existence of the links
    expect(screen.getByText(/Profile/i)).toHaveAttribute("href", "/profile");
    expect(screen.getByText(/Settings/i)).toHaveAttribute("href", "/settings");
    expect(screen.getByText(/Logout/i)).toHaveAttribute("href", "/logout");
  });
});
