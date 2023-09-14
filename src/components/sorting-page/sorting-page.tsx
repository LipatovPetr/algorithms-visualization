import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { generateRandomArray, mapArray } from "./algorithm";
import { arrayElementWithState } from "./Types";

export const SortingPage: React.FC = () => {
  const [sortingOption, setSortingOption] = useState("Select");
  const [sortedArray, setSortedArray] = useState<arrayElementWithState[]>();

  useEffect(function generateArrayOnLoad() {
    const randomArray = generateRandomArray();
    const mappedArray = mapArray(randomArray);
    setSortedArray(mappedArray);
  }, []);

  const handleGenerateNewArrayClick = (e: MouseEvent<HTMLButtonElement>) => {
    const randomArray = generateRandomArray();
    const mappedArray = mapArray(randomArray);
    setSortedArray(mappedArray);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingOption(e.target.value);
  };

  function selectSort(arr: arrayElementWithState[]) {
    const arrayCopy = [...arr];

    const len = arrayCopy.length;

    for (let i = 0; i < len; i++) {
      let indexOfMin = i;
      for (let j = i + 1; j < len; j++) {
        if (arrayCopy[indexOfMin].value > arrayCopy[j].value) indexOfMin = j;
      }
      if (indexOfMin !== i) {
        const temp = arrayCopy[indexOfMin].value;
        arrayCopy[indexOfMin].value = arrayCopy[i].value;
        arrayCopy[i].value = temp;
      }
    }
    setSortedArray(arrayCopy);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputsContainer}>
        <div className={styles.radioContainer}>
          <RadioInput
            name="sorting"
            label={"Выбор"}
            value="Select"
            onChange={handleRadioChange}
            checked={sortingOption === "Select"}
          />
          <RadioInput
            name="sorting"
            label={"Пузырёк"}
            value="Buble"
            onChange={handleRadioChange}
            checked={sortingOption === "Buble"}
          />
        </div>

        <div className={styles.filtersContainer}>
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            onClick={() => {
              selectSort(sortedArray!);
            }}
          />
          <Button text={"По убыванию"} sorting={Direction.Descending} />
        </div>

        <Button text={"Новый массив"} onClick={handleGenerateNewArrayClick} />
      </div>
      <div className={styles.graphContainer}>
        {sortedArray &&
          sortedArray.map((el) => <Column index={el.value} key={el.id} />)}
      </div>
    </SolutionLayout>
  );
};
