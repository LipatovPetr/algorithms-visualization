import { linkedlistModelNode } from "../../components/list-page/types";
import { ElementStates } from "../../types/element-states";
import { Dispatch, SetStateAction } from "react";
import { delay } from "..";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { loadingStates } from "../../components/list-page/types";

/**
 * Checks if an index exists within the array bounds.
 *
 * @param index - The index to be checked.
 * @param listArray - The array in which to check the index.
 * @returns `true` if the index exists within the array range, `false` otherwise.
 */

export function isWithinListSize(
  index: number,
  listArray: Array<linkedlistModelNode>
) {
  return 0 <= index && index < listArray.length;
}

/**
 * Adds a value to the beginning of an array and sets its color state.
 *
 * @param arr - The array to which the value will be added.
 * @param inputValue - The value to be added to the head of the array.
 * @param colorState - (Optional) The state of the added value (default: ElementStates.Modified).
 */

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

/**
 * Adds a value to the end of an array and sets its color state.
 *
 * @param arr - The array to which the value will be added.
 * @param inputValue - The value to be added to the tail of the array.
 * @param colorState - (Optional) The state of the added value.
 */

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

/**
 * Adds a value to an array at a specific index and sets its color state.
 *
 * @param {Array<linkedlistModelNode>} arr - The array to which the value will be added.
 * @param {number} inputIndex - The index at which the value will be inserted.
 * @param {string} inputValue - The value to be inserted into the array.
 * @param {ElementStates} colorState - (Optional) The state of the inserted value (default: ElementStates.Modified).
 */

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

/**
 * Resets the color state of a node at a specific index in the array to the default state.
 * This function is typically used after operations like 'addToTail' that may change the node's color state.
 *
 * @param {Array<linkedlistModelNode>} arr - The array containing the nodes.
 * @param {number} index - The index of the node whose color state will be changed to default.
 */

export function changeNodeColorToDefault(
  arr: Array<linkedlistModelNode>,
  index: number
) {
  arr[index].state = ElementStates.Default;
}

/**
 * Sets the value of the 'incomingValue' property for a node at the specified index in the array.
 *
 * @param {Array<linkedlistModelNode>} arr - The array containing the nodes.
 * @param {number} index - The index of the node whose incoming value will be highlighted.
 * @param {string | null} inputValue - The incoming value to be highlighted (or null to clear the highlighting).
 */

export function highlightIncomingValue(
  arr: Array<linkedlistModelNode>,
  index: number,
  inputValue: string | null
) {
  arr[index].incomingValue = inputValue;
}

/**
 * Prepares a node at a specific index in the array for removal by clearing its value property and setting its state to default.
 * The original value is preserved in the 'incomingValue' property.
 *
 * @param {Array<linkedlistModelNode>} arr - The array containing the nodes.
 * @param {number} index - The index of the node to be prepared for removal.
 */

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

/**
 * Highlights nodes in an array up to a specified index by setting their 'incomingValue' property and state.
 * This function is typically used to indicate a change in value while inserting elements.
 *
 * @param {Array<linkedlistModelNode>} arr - The array containing the nodes.
 * @param {number} index - The index up to which nodes will be highlighted.
 * @param {string} value - The incoming value to be assigned to the nodes.
 * @param {Dispatch<SetStateAction<linkedlistModelNode[]>>} stateSetter - A state setter function to update the array state.
 */

export async function highlightNodesAndIncomingValue(
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

/**
 * Highlights nodes in an array up to a specified index by setting their state property.
 *
 * @param {Array<linkedlistModelNode>} arr - The array containing the nodes.
 * @param {number} index - The index up to which nodes will be highlighted.
 * @param {Dispatch<SetStateAction<linkedlistModelNode[]>>} stateSetter - A state setter function to update the array state.
 */

export async function highlightNodes(
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
  }
}

/**
 * Determines if a node at a specified index represents the head of the linked list and checks the current loading state,
 * allowing the head to be hidden during list model transformations.
 *
 * @param {number} index - The index of the node to check.
 * @param {loadingStates} isLoadingState - The current loading state of the linked list.
 * @returns {boolean | null} `HEAD` if the node is the head and should be shown, `null` if it should be hidden during loading.
 */

export function isHead(index: number, isLoadingState: loadingStates) {
  if (
    index === 0 &&
    !isLoadingState.additionByIndex &&
    !isLoadingState.additionToHead &&
    !isLoadingState.additionToTail &&
    !isLoadingState.deletionByIndex &&
    !isLoadingState.deletionFromHead &&
    !isLoadingState.deletionFromTail
  ) {
    return HEAD;
  } else {
    return null;
  }
}

/**
 * Determines if a node at a specified index represents the head of the linked list and checks the current loading state,
 * allowing the head to be hidden during list model transformations.
 *
 * @param {Array<linkedlistModelNode>} arr - The array containing the nodes.
 * @param {number} index - The index of the node to check.
 * @param {loadingStates} isLoadingState - The current loading state of the linked list.
 * @returns {boolean | null} `TAIL` if the node is the tail and should be shown, `null` if it should be hidden during loading.
 */

export function isTail(
  arr: Array<linkedlistModelNode>,
  index: number,
  isLoadingState: loadingStates
) {
  if (
    index === arr.length - 1 &&
    !isLoadingState.additionByIndex &&
    !isLoadingState.additionToHead &&
    !isLoadingState.additionToTail &&
    !isLoadingState.deletionByIndex &&
    !isLoadingState.deletionFromHead &&
    !isLoadingState.deletionFromTail
  ) {
    return TAIL;
  } else {
    return null;
  }
}
