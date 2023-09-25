import { ElementStates } from "../types/element-states";

// func to set a delay

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// func sets preditermind states for colors

export function setColorState(index: number, indexToHighlight: number) {
  return index === indexToHighlight
    ? ElementStates.Changing
    : ElementStates.Default;
}

// func to generate random arr

export function generateRandomArray(
  minNumber: number,
  maxNumber: number,
  minLength: number,
  maxLength: number
) {
  const randomArray = [];
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  for (let i = 0; i < length; i++) {
    randomArray.push(
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
    );
  }

  return randomArray;
}
