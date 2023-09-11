import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";

import {
  stringMappedToCharsWithState,
  charObj,
} from "../../components/string/types";

export function mapStringToArray(str: string): stringMappedToCharsWithState {
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

export async function reverseString(
  string: string,
  stateSetter: Dispatch<SetStateAction<stringMappedToCharsWithState>>,
  delayValue: number
) {
  let processedString = mapStringToArray(string);
  const len = processedString.length;

  for (let i = 0; i < len / 2; i++) {
    // highlight changing elements
    processedString[i].state = ElementStates.Changing;
    processedString[len - 1 - i].state = ElementStates.Changing;
    stateSetter([...processedString]);

    await delay(delayValue);

    // swap changing elements
    swapChars(processedString, i, len - 1 - i);

    // highlight successfully changed elements
    processedString[i].state = ElementStates.Modified;
    processedString[len - 1 - i].state = ElementStates.Modified;
    stateSetter([...processedString]);

    await delay(delayValue);
  }
}
