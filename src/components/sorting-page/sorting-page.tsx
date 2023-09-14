import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { generateRandomArray, mapArray, selectSort } from "./algorithm";
import { arrayElementWithState } from "./Types";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [sortingOption, setSortingOption] = useState("Select");
  const [sortedArray, setSortedArray] = useState<arrayElementWithState[]>([]);

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
              selectSort(sortedArray, setSortedArray, SHORT_DELAY_IN_MS);
            }}
          />
          <Button text={"По убыванию"} sorting={Direction.Descending} />
        </div>

        <Button text={"Новый массив"} onClick={handleGenerateNewArrayClick} />
      </div>
      <div className={styles.graphContainer}>
        {sortedArray &&
          sortedArray.map((el) => (
            <Column index={el.value} state={el.state} key={el.id} />
          ))}
      </div>
    </SolutionLayout>
  );
};
