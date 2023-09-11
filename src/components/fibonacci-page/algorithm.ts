import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Dispatch, SetStateAction } from "react";

function calculateFibonacci(num: number): number {
  if (num < 2) {
    return num;
  }
  const fibValue = calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
  return fibValue;
}

export async function generateFibonacciSequence(
  length: number,
  stateSetter: Dispatch<SetStateAction<number[]>>
) {
  const sequence: number[] = [];

  for (let i = 0; i <= length; i++) {
    const fibValue = await calculateFibonacci(i);
    sequence.push(fibValue);
    stateSetter([...sequence]);
    await delay(SHORT_DELAY_IN_MS);
  }
}