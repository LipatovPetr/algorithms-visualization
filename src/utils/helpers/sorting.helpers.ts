import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";

// func to map random arr to arr with state and ids

export function mapArray(arr: number[]) {
  return arr.map((el) => ({
    value: el,
    state: ElementStates.Default,
    id: nanoid(5),
  }));
}
