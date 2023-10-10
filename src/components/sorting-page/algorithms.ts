import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Dispatch, SetStateAction } from "react";
import _ from "lodash";

import { elementWithState } from "./Types";
import { addStatestoArrayElement } from "../../utils/helpers/sorting.helpers";

// helpers used in both algos

const updateElementColor = (
  arr: Array<elementWithState>,
  index: number,
  colorState: "default1" | "changing1" | "modified1"
) => {
  switch (colorState) {
    case "default1":
      arr[index].state = ElementStates.Default;
      break;
    case "changing1":
      arr[index].state = ElementStates.Changing;
      break;
    case "modified1":
      arr[index].state = ElementStates.Modified;
      break;
  }
};

const updateState = (
  callback: Dispatch<SetStateAction<Array<elementWithState>>>,
  arr: Array<elementWithState>
) => {
  callback([...arr]);
};

const swapElements = (
  arr: Array<elementWithState>,
  index1: number,
  index2: number
) => {
  const temp = arr[index1].value;
  arr[index1].value = arr[index2].value;
  arr[index2].value = temp;
};

const sortingCondition = (
  arr: Array<elementWithState>,
  a: number,
  b: number,
  sortingOrder: "asc" | "desc"
) => {
  return sortingOrder === "asc"
    ? arr[a].value > arr[b].value
    : arr[a].value < arr[b].value;
};

// f creates sequence from select sort

export function createSelectSortSeq(
  arr: Array<elementWithState>,
  sortingOrder: "asc" | "desc"
) {
  let sequence = [];
  let arrayCopy = [...arr];
  const len = arrayCopy.length;

  sequence.push(_.cloneDeep(arrayCopy));

  for (let i = 0; i < len; i++) {
    let indexOfMin = i;

    updateElementColor(arrayCopy, i, "changing1");
    sequence.push(_.cloneDeep(arrayCopy));

    for (let j = i + 1; j < len; j++) {
      updateElementColor(arrayCopy, j, "changing1");
      sequence.push(_.cloneDeep(arrayCopy));

      if (sortingCondition(arrayCopy, indexOfMin, j, sortingOrder)) {
        indexOfMin = j;
      }

      updateElementColor(arrayCopy, j, "default1");
      sequence.push(_.cloneDeep(arrayCopy));
    }

    if (indexOfMin !== i) {
      swapElements(arrayCopy, indexOfMin, i);
    }
    updateElementColor(arrayCopy, i, "modified1");
    sequence.push(_.cloneDeep(arrayCopy));
  }
  return sequence;
}

// f creates sequence from bubble sort

export function createbBubbleSortSeq(
  arr: Array<elementWithState>,
  sortingOrder: "asc" | "desc"
) {
  let sequence = [];
  let arrayCopy = [...arr];
  const len = arr.length;

  sequence.push(_.cloneDeep(arrayCopy));

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      updateElementColor(arrayCopy, j, "changing1");
      updateElementColor(arrayCopy, j + 1, "changing1");

      sequence.push(_.cloneDeep(arrayCopy));

      if (sortingCondition(arrayCopy, j, j + 1, sortingOrder)) {
        swapElements(arrayCopy, j, j + 1);
      }

      updateElementColor(arrayCopy, j, "default1");
      updateElementColor(arrayCopy, j + 1, "default1");
      sequence.push(_.cloneDeep(arrayCopy));
    }
    updateElementColor(arrayCopy, len - i - 1, "modified1");
    sequence.push(_.cloneDeep(arrayCopy));
  }
  updateElementColor(arrayCopy, 0, "modified1");
  sequence.push(_.cloneDeep(arrayCopy));
  return sequence;
}
