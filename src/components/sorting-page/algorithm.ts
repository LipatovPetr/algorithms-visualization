import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Dispatch, SetStateAction } from "react";

import { elementWithState } from "./Types";

// helpers used in both algos

const updateElementColor = (
  arr: Array<elementWithState>,
  index: number,
  colorState: "default" | "changing" | "modified"
) => {
  switch (colorState) {
    case "default":
      arr[index].state = ElementStates.Default;
      break;
    case "changing":
      arr[index].state = ElementStates.Changing;
      break;
    case "modified":
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

const swap = (arr: Array<elementWithState>, index1: number, index2: number) => {
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

// select sort algo

export async function selectSort(
  arr: Array<elementWithState>,
  stateSetter: Dispatch<SetStateAction<Array<elementWithState>>>,
  delayValue: number,
  sortingOrder: "asc" | "desc"
) {
  const arrayCopy = [...arr];
  const len = arrayCopy.length;

  for (let i = 0; i < len; i++) {
    let indexOfMin = i;

    updateElementColor(arrayCopy, i, "changing");
    updateState(stateSetter, arrayCopy);

    for (let j = i + 1; j < len; j++) {
      updateElementColor(arrayCopy, j, "changing");
      updateState(stateSetter, arrayCopy);
      await delay(delayValue);

      if (sortingCondition(arrayCopy, indexOfMin, j, sortingOrder)) {
        indexOfMin = j;
      }

      updateElementColor(arrayCopy, j, "default");
      updateState(stateSetter, arrayCopy);
    }

    if (indexOfMin !== i) {
      swap(arrayCopy, indexOfMin, i);
    }
    updateElementColor(arrayCopy, i, "modified");
    updateState(stateSetter, arrayCopy);
  }
}

// bubble sort algo

export async function bubbleSort(
  arr: Array<elementWithState>,
  stateSetter: Dispatch<SetStateAction<Array<elementWithState>>>,
  delayValue: number,
  sortingOrder: "asc" | "desc"
) {
  const arrayCopy = [...arr];
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (sortingCondition(arrayCopy, j, j + 1, sortingOrder)) {
        updateElementColor(arrayCopy, j, "changing");
        updateElementColor(arrayCopy, j + 1, "changing");
        updateState(stateSetter, arrayCopy);
        await delay(delayValue);

        swap(arrayCopy, j, j + 1);

        updateElementColor(arrayCopy, j, "default");
        updateElementColor(arrayCopy, j + 1, "default");
        updateState(stateSetter, arrayCopy);
      }
    }
    updateElementColor(arrayCopy, len - i - 1, "modified");
    updateState(stateSetter, arrayCopy);
  }
  updateElementColor(arrayCopy, 0, "modified");
  updateState(stateSetter, arrayCopy);
}
