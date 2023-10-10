import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";
import { elementWithState } from "../../components/sorting-page/Types";
import { delay } from "..";

// func to map random arr to arr with state and ids

export function addStatestoArrayElement(arr: number[]) {
  return arr.map((el) => ({
    value: el,
    state: ElementStates.Default,
    id: nanoid(5),
  }));
}

// func to animate sequence

export async function animateSequence(
  sequence: elementWithState[][],
  stateSetter: Dispatch<SetStateAction<elementWithState[]>>
) {
  for (const step of sequence) {
    stateSetter([...step]);
    await delay(50);
  }
}
