import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import _ from "lodash";

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

  // highlight changing elements
  for (let i = 0; i < len / 2; i++) {
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

export function createReverseStringSeq(string: string) {
  let processedString = mapStringToArray(string);
  let reverseStringSeq: stringMappedToCharsWithState[] = [];
  const len = processedString.length;

  reverseStringSeq.push(_.cloneDeep(processedString));

  // highlight changing elements
  for (let i = 0; i < len / 2; i++) {
    processedString[i].state = ElementStates.Changing;
    processedString[len - 1 - i].state = ElementStates.Changing;

    reverseStringSeq.push(_.cloneDeep(processedString));
    // swap changing elements
    swapChars(processedString, i, len - 1 - i);

    // highlight successfully changed elements
    processedString[i].state = ElementStates.Modified;
    processedString[len - 1 - i].state = ElementStates.Modified;

    reverseStringSeq.push(_.cloneDeep(processedString));
  }
  return reverseStringSeq;
}

console.log(createReverseStringSeq("seq"));
