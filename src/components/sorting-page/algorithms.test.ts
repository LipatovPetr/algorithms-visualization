import { addStatestoArrayElement } from "../../utils/helpers/sorting.helpers";
import { createSelectSortSeq, createbBubbleSortSeq } from "./algorithms";

describe("Sorting algorithms", () => {
  test("Select Sort: multiple elements", () => {
    const arr = addStatestoArrayElement([3, 1, 7]);
    const sequence = createSelectSortSeq(arr, "asc");

    expect(sequence).toEqual([
      [
        {
          value: 3,
          state: "default",
        },
        {
          value: 1,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 3,
          state: "changing",
        },
        {
          value: 1,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 3,
          state: "changing",
        },
        {
          value: 1,
          state: "changing",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 3,
          state: "changing",
        },
        {
          value: 1,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 3,
          state: "changing",
        },
        {
          value: 1,
          state: "default",
        },
        {
          value: 7,
          state: "changing",
        },
      ],
      [
        {
          value: 3,
          state: "changing",
        },
        {
          value: 1,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "changing",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "changing",
        },
        {
          value: 7,
          state: "changing",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "changing",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "modified",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "modified",
        },
        {
          value: 7,
          state: "changing",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "modified",
        },
        {
          value: 7,
          state: "modified",
        },
      ],
    ]);
  });

  test("Bubble Sort: multiple elements", () => {
    const arr = addStatestoArrayElement([3, 1, 7]);
    const sequence = createbBubbleSortSeq(arr, "asc");

    expect(sequence).toEqual([
      [
        {
          value: 3,
          state: "default",
        },
        {
          value: 1,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 3,
          state: "changing",
        },
        {
          value: 1,
          state: "changing",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "default",
        },
        {
          value: 3,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "default",
        },
        {
          value: 3,
          state: "changing",
        },
        {
          value: 7,
          state: "changing",
        },
      ],
      [
        {
          value: 1,
          state: "default",
        },
        {
          value: 3,
          state: "default",
        },
        {
          value: 7,
          state: "default",
        },
      ],
      [
        {
          value: 1,
          state: "default",
        },
        {
          value: 3,
          state: "default",
        },
        {
          value: 7,
          state: "modified",
        },
      ],
      [
        {
          value: 1,
          state: "changing",
        },
        {
          value: 3,
          state: "changing",
        },
        {
          value: 7,
          state: "modified",
        },
      ],
      [
        {
          value: 1,
          state: "default",
        },
        {
          value: 3,
          state: "default",
        },
        {
          value: 7,
          state: "modified",
        },
      ],
      [
        {
          value: 1,
          state: "default",
        },
        {
          value: 3,
          state: "modified",
        },
        {
          value: 7,
          state: "modified",
        },
      ],
      [
        {
          value: 1,
          state: "modified",
        },
        {
          value: 3,
          state: "modified",
        },
        {
          value: 7,
          state: "modified",
        },
      ],
    ]);
  });
});
