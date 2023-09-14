import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Dispatch, SetStateAction } from "react";

import { arrayElementWithState } from "./Types";

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

export async function selectSort(
  arr: arrayElementWithState[],
  stateSetter: Dispatch<SetStateAction<arrayElementWithState[]>>,
  delayValue: number
) {
  const arrayCopy = [...arr];
  const len = arrayCopy.length;

  for (let i = 0; i < len; i++) {
    let indexOfMin = i;

    arrayCopy[i].state = ElementStates.Changing;
    stateSetter([...arrayCopy]);

    for (let j = i + 1; j < len; j++) {
      arrayCopy[j].state = ElementStates.Changing;
      stateSetter([...arrayCopy]);
      await delay(delayValue);

      if (arrayCopy[indexOfMin].value < arrayCopy[j].value) {
        indexOfMin = j;
      }

      arrayCopy[j].state = ElementStates.Default;
      stateSetter([...arrayCopy]);
    }

    if (indexOfMin !== i) {
      const temp = arrayCopy[indexOfMin].value;
      arrayCopy[indexOfMin].value = arrayCopy[i].value;
      arrayCopy[i].value = temp;
    }

    arrayCopy[i].state = ElementStates.Modified;
    stateSetter([...arrayCopy]);
  }
}
