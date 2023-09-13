import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Dispatch, SetStateAction } from "react";

// cache decorator

function cacheDecorator(func: (arg: number) => number) {
  const cache = new Map();

  return function (arg: number) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    let result = func(arg);
    cache.set(arg, result);
    return result;
  };
}

// calculateNthFibonacciValue - calculates n-th value if fibanocci sequence

function calculateNthFibValue(num: number): number {
  if (num < 2) {
    return num;
  }
  const fibValue =
    calculateNthFibValue(num - 1) + calculateNthFibValue(num - 2);
  return fibValue;
}

const calculateNthFibValueCached = cacheDecorator(calculateNthFibValue);

// generateFibonacciSequence - creates a fibanocci sequence by using calculateFibonacci in a loop

export async function generateFibonacciSequence(
  length: number,
  stateSetter: Dispatch<SetStateAction<number[]>>
) {
  const sequence: number[] = [];

  for (let i = 0; i <= length; i++) {
    const fibValue = await calculateNthFibValueCached(i);
    sequence.push(fibValue);
    stateSetter([...sequence]);
    await delay(SHORT_DELAY_IN_MS);
  }
}
