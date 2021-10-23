import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const header = screen.getByText("Mute Poets");
  expect(header).toBeInTheDocument();
});

test("renders connect button", () => {
  render(<App />);
  const claimLute = screen.getByText(/Connect/i);
  expect(claimLute).toBeInTheDocument();
});
