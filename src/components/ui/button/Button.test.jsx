import { render, screen } from "@testing-library/react";
import { Button } from "./Button.tsx";

test("Render Button with text", () => {
  render(<Button text="Текст кнопки" />);
  const button = screen.getByText("Текст кнопки");
  expect(button).toBeInTheDocument();
  expect(button).toMatchSnapshot();
});
