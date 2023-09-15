import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Dispatch, SetStateAction } from "react";

import { elementWithState } from "./Types";

// func to generate random arr

export function generateRandomArray() {
  const minLength = 3;
  const maxLength = 17;

  const randomArray = [];
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  for (let i = 0; i < length; i++) {
    randomArray.push(Math.floor(Math.random() * 101));
  }

  return randomArray;
}

// func to map random arr to arr with state and ids

export function mapArray(arr: number[]) {
  return arr.map((el) => ({
    value: el,
    state: ElementStates.Default,
    id: nanoid(5),
  }));
}

// helpers for both algos

const updateElementColorState = (
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

    updateElementColorState(arrayCopy, i, "changing");
    updateState(stateSetter, arrayCopy);

    for (let j = i + 1; j < len; j++) {
      updateElementColorState(arrayCopy, j, "changing");
      updateState(stateSetter, arrayCopy);
      await delay(delayValue);

      if (sortingCondition(arrayCopy, indexOfMin, j, sortingOrder)) {
        indexOfMin = j;
      }

      updateElementColorState(arrayCopy, j, "default");
      updateState(stateSetter, arrayCopy);
    }

    if (indexOfMin !== i) {
      swap(arrayCopy, indexOfMin, i);
    }
    updateElementColorState(arrayCopy, i, "modified");
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
        updateElementColorState(arrayCopy, j, "changing");
        updateElementColorState(arrayCopy, j + 1, "changing");
        updateState(stateSetter, arrayCopy);
        await delay(delayValue);

        swap(arrayCopy, j, j + 1);

        updateElementColorState(arrayCopy, j, "default");
        updateElementColorState(arrayCopy, j + 1, "default");
        updateState(stateSetter, arrayCopy);
      }
    }
    updateElementColorState(arrayCopy, len - i - 1, "modified");
    updateState(stateSetter, arrayCopy);
  }
  updateElementColorState(arrayCopy, 0, "modified");
  updateState(stateSetter, arrayCopy);
}
