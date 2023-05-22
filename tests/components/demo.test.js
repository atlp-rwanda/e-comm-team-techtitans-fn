import { render, screen } from "@testing-library/react";
import React from "react";
import Demo from "../../src/components/testdemo/Demo";

test("Greet renders correctly", () => {
  render(<Demo />);
  const textElement = screen.getByText("Hello world");
  expect(textElement).toBeInTheDocument();
});
