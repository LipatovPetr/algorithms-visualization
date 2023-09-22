import { linkedlistModelNode } from "../../components/list-page/types";
import { ElementStates } from "../../types/element-states";

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

export function changeColorState(
  arr: Array<linkedlistModelNode>,
  index: number
) {
  arr[index].state = ElementStates.Default;
}

export function setIncomingValue(
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
