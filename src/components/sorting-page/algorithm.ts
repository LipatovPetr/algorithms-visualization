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

// select sort algo

const updateState = (
  callback: Dispatch<SetStateAction<Array<elementWithState>>>,
  arr: Array<elementWithState>
) => {
  callback([...arr]);
};

const updateElementColorInCopy = (
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

    updateElementColorInCopy(arrayCopy, i, "changing");
    updateState(stateSetter, arrayCopy);

    for (let j = i + 1; j < len; j++) {
      updateElementColorInCopy(arrayCopy, j, "changing");
      updateState(stateSetter, arrayCopy);
      await delay(delayValue);

      const isAscending =
        sortingOrder === "asc"
          ? arrayCopy[indexOfMin].value > arrayCopy[j].value
          : arrayCopy[indexOfMin].value < arrayCopy[j].value;

      if (isAscending) {
        indexOfMin = j;
      }

      updateElementColorInCopy(arrayCopy, j, "default");
      updateState(stateSetter, arrayCopy);
    }

    if (indexOfMin !== i) {
      const temp = arrayCopy[indexOfMin].value;
      arrayCopy[indexOfMin].value = arrayCopy[i].value;
      arrayCopy[i].value = temp;
    }
    updateElementColorInCopy(arrayCopy, i, "modified");
    updateState(stateSetter, arrayCopy);
  }
}
