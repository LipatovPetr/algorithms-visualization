import { render, screen, fireEvent } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle Component", () => {
  test("Render Circle without props", () => {
    render(<Circle />);
    const circle = screen.getByTestId("circle-component");
    expect(circle).toBeInTheDocument();
    expect(circle).toMatchSnapshot();
  });

  test("Render Circle with letters", () => {
    render(<Circle letter="qwe" />);
    const letters = screen.getByText("qwe");

    expect(letters).toBeInTheDocument();
    expect(letters).toMatchSnapshot();
  });

  test("Render Circle with head", () => {
    render(<Circle head="head" />);
    const head = screen.getByText("head");

    expect(head).toBeInTheDocument();
    expect(head).toMatchSnapshot();
  });

  test("Render Circle with tail", () => {
    render(<Circle tail="tail" />);
    const tail = screen.getByText("tail");

    expect(tail).toBeInTheDocument();
    expect(tail).toMatchSnapshot();
  });
  test("Render Circle with index", () => {
    render(<Circle index={12} />);
    const index = screen.getByText(12);

    expect(index).toBeInTheDocument();
    expect(index).toMatchSnapshot();
  });

  test("Render Circle with small class", () => {
    render(<Circle isSmall={true} />);
    const circleEl = screen.getByTestId("circle-element");

    expect(circleEl).toHaveClass("small");
    expect(circleEl).toMatchSnapshot();
  });

  test("Render Circle with DEFAULT state", () => {
    render(<Circle state={ElementStates.Default} />);
    const circleEl = screen.getByTestId("circle-element");

    expect(circleEl).toHaveClass("default");
    expect(circleEl).toMatchSnapshot();
  });

  test("Render Circle with CHANGING state", () => {
    render(<Circle state={ElementStates.Changing} />);
    const circleEl = screen.getByTestId("circle-element");

    expect(circleEl).toHaveClass("changing");
    expect(circleEl).toMatchSnapshot();
  });

  test("Render Circle with MODIFIED state", () => {
    render(<Circle state={ElementStates.Modified} />);
    const circleEl = screen.getByTestId("circle-element");

    expect(circleEl).toHaveClass("modified");
    expect(circleEl).toMatchSnapshot();
  });
});
