import { linkedlistModelNode } from "../../components/list-page/types";
import { ElementStates } from "../../types/element-states";
import { Dispatch, SetStateAction } from "react";
import { delay } from "..";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export function isWithinListSize(
  index: number,
  listArray: Array<linkedlistModelNode>
) {
  return 0 <= index && index < listArray.length;
}

export function addToHead(
  arr: Array<linkedlistModelNode>,
  inputValue: string,
  colorState = ElementStates.Modified
) {
  arr.unshift({
    value: inputValue,
    state: colorState,
    incomingValue: null,
  });
}

export function addToTail(
  arr: Array<linkedlistModelNode>,
  inputValue: string,
  colorState = ElementStates.Modified
) {
  arr.push({
    value: inputValue,
    state: colorState,
    incomingValue: null,
  });
}

export function addByIndex(
  arr: Array<linkedlistModelNode>,
  inputIndex: number,
  inputValue: string,
  colorState = ElementStates.Modified
) {
  arr.splice(inputIndex, 0, {
    value: inputValue,
    state: colorState,
    incomingValue: null,
  });
}

export function changeNodeColor(
  arr: Array<linkedlistModelNode>,
  index: number
) {
  arr[index].state = ElementStates.Default;
}

export function highlightIncomingValue(
  arr: Array<linkedlistModelNode>,
  index: number,
  inputValue: string | null
) {
  arr[index].incomingValue = inputValue;
}

export function setElementForRemoval(
  arr: Array<linkedlistModelNode>,
  index: number
) {
  const el = arr[index].value;
  arr[index] = {
    value: "",
    state: ElementStates.Default,
    incomingValue: el,
  };
}

export async function loopHighlightingNodesAndIncomingValue(
  arr: Array<linkedlistModelNode>,
  index: number,
  value: string,
  stateSetter: Dispatch<SetStateAction<linkedlistModelNode[]>>
) {
  for (let i = 0; i <= index; i++) {
    arr[i].incomingValue = value;

    if (i > 0) {
      arr[i - 1].incomingValue = null;
      arr[i - 1].state = ElementStates.Changing;
    }
    stateSetter([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  }
}

export async function loopHighlightingNodes(
  arr: Array<linkedlistModelNode>,
  index: number,
  stateSetter: Dispatch<SetStateAction<linkedlistModelNode[]>>
) {
  for (let i = 0; i <= index; i++) {
    if (i > 0) {
      arr[i - 1].state = ElementStates.Changing;
    }
    stateSetter([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    // stateSetter([...arr]);
  }
}
