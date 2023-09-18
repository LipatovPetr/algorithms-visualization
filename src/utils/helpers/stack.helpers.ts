import { ElementStates } from "../../types/element-states";

export const isHead = (arr: string[], index: number) => {
  return index === arr.length - 1;
};

export const setColorState = (currentIndex: number, lastIndex: number) => {
  return currentIndex === lastIndex
    ? ElementStates.Changing
    : ElementStates.Default;
};
