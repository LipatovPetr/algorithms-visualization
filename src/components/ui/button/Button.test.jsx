import { render, screen } from "@testing-library/react";
import { Button } from "./Button.tsx";

describe("Button Component", () => {
  test("Render Button without text", () => {
    render(<Button />);
    const button = screen.getByTestId("button-component");
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  test("Render Button with text", () => {
    render(<Button text="Текст кнопки" />);
    const button = screen.getByText("Текст кнопки");
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  test("Render disabled Button", () => {
    render(<Button disabled />);
    const button = screen.getByTestId("button-component");
    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  test("Render Button with loading status", () => {
    render(<Button isLoader />);
    const button = screen.getByTestId("button-component");
    const loaderImage = screen.getByAltText("Загрузка.");
    expect(button).toBeInTheDocument();
    expect(loaderImage).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });
});
