import React, { Dispatch, SetStateAction, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { mapStringToArray, swapChars, reverseString } from "./algorithm";
import { stringMappedToCharsWithState } from "./types";

// Mock state.
jest.mock("react", () => ({
  // Returns the actual module instead of a mock,
  // bypassing all checks on whether the module should receive
  // a mock implementation or not.
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
const setState = jest.fn();

describe("Reverse string algorithm", () => {
  test("Secondary method: mapStringToArray", () => {
    const str = "hello";
    const result = mapStringToArray(str);

    expect(result).toEqual([
      { character: "h", state: ElementStates.Default },
      { character: "e", state: ElementStates.Default },
      { character: "l", state: ElementStates.Default },
      { character: "l", state: ElementStates.Default },
      { character: "o", state: ElementStates.Default },
    ]);
  });

  test("Secondary method: swapChars", () => {
    const arr = [
      { character: "a", state: ElementStates.Default },
      { character: "b", state: ElementStates.Default },
    ];

    swapChars(arr, 0, 1);

    expect(arr).toEqual([
      { character: "b", state: ElementStates.Default },
      { character: "a", state: ElementStates.Default },
    ]);
  });

  //   test("Primary method: reverseString ", () => {
  //     const setState = jest.fn();
  //     jest
  //       .spyOn(React, 'useState')
  //       .mockImplementationOnce((initState) => [initState, setState]);
});
