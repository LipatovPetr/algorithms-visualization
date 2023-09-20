import { ElementStates } from "../types/element-states";

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function setColorState(index: number, indexToHighlight: number) {
  return index === indexToHighlight
    ? ElementStates.Changing
    : ElementStates.Default;
}
