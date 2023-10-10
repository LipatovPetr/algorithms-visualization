import { ElementStates } from "../../types/element-states";
import {
  mapStringToArray,
  swapChars,
  createReverseStringSeq,
} from "./algorithm";

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

  test("Reverse String algo: even chars", () => {
    const reversedStringSequence = createReverseStringSeq("abcd");

    expect(reversedStringSequence).toEqual([
      [
        {
          character: "a",
          state: "default",
        },
        {
          character: "b",
          state: "default",
        },
        {
          character: "c",
          state: "default",
        },
        {
          character: "d",
          state: "default",
        },
      ],
      [
        {
          character: "a",
          state: "changing",
        },
        {
          character: "b",
          state: "default",
        },
        {
          character: "c",
          state: "default",
        },
        {
          character: "d",
          state: "changing",
        },
      ],
      [
        {
          character: "d",
          state: "modified",
        },
        {
          character: "b",
          state: "default",
        },
        {
          character: "c",
          state: "default",
        },
        {
          character: "a",
          state: "modified",
        },
      ],
      [
        {
          character: "d",
          state: "modified",
        },
        {
          character: "b",
          state: "changing",
        },
        {
          character: "c",
          state: "changing",
        },
        {
          character: "a",
          state: "modified",
        },
      ],
      [
        {
          character: "d",
          state: "modified",
        },
        {
          character: "c",
          state: "modified",
        },
        {
          character: "b",
          state: "modified",
        },
        {
          character: "a",
          state: "modified",
        },
      ],
    ]);
  });

  test("Reverse String algo: odd chars", () => {
    const reversedStringSequence = createReverseStringSeq("abc");

    expect(reversedStringSequence).toEqual([
      [
        {
          character: "a",
          state: "default",
        },
        {
          character: "b",
          state: "default",
        },
        {
          character: "c",
          state: "default",
        },
      ],
      [
        {
          character: "a",
          state: "changing",
        },
        {
          character: "b",
          state: "default",
        },
        {
          character: "c",
          state: "changing",
        },
      ],
      [
        {
          character: "c",
          state: "modified",
        },
        {
          character: "b",
          state: "default",
        },
        {
          character: "a",
          state: "modified",
        },
      ],
      [
        {
          character: "c",
          state: "modified",
        },
        {
          character: "b",
          state: "changing",
        },
        {
          character: "a",
          state: "modified",
        },
      ],
      [
        {
          character: "c",
          state: "modified",
        },
        {
          character: "b",
          state: "modified",
        },
        {
          character: "a",
          state: "modified",
        },
      ],
    ]);
  });

  test("Reverse String algo: single char", () => {
    const reversedStringSequence = createReverseStringSeq("a");

    expect(reversedStringSequence).toEqual([
      [
        {
          character: "a",
          state: "default",
        },
      ],
      [
        {
          character: "a",
          state: "changing",
        },
      ],
      [
        {
          character: "a",
          state: "modified",
        },
      ],
    ]);
  });

  test("Reverse String algo: empty string", () => {
    const reversedStringSequence = createReverseStringSeq("");

    expect(reversedStringSequence).toEqual([[]]);
  });
});
