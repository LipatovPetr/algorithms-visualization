import { ElementStates } from "../../types/element-states";

import {
  stringMappedToCharsWithState,
  charObj,
} from "../../components/string/types";

export function mapStringToArray(str: string) {
  return str.split("").map(
    (char): charObj => ({
      character: char,
      state: ElementStates.Default,
    })
  );
}

export function swapChars(
  arr: stringMappedToCharsWithState,
  i: number,
  j: number
) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
