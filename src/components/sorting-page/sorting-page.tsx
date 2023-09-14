import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { generateRandomArray } from "./algorithm";

export const SortingPage: React.FC = () => {
  const [sortingOption, setSortingOption] = useState("Select");
  const [sortedArray, setSortedArray] = useState<number[]>();

  useEffect(() => {
    const randomArray = generateRandomArray();
    setSortedArray(randomArray);
  }, []);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingOption(e.target.value);
  };

  const handleGenerateNewArray = (e: MouseEvent<HTMLButtonElement>) => {
    const randomArray = generateRandomArray();
    setSortedArray(randomArray);
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
          <Button text={"По возрастанию"} sorting={Direction.Ascending} />
          <Button text={"По убыванию"} sorting={Direction.Descending} />
        </div>

        <Button text={"Новый массив"} onClick={handleGenerateNewArray} />
      </div>
      <div className={styles.graphContainer}>
        {sortedArray && sortedArray.map((value) => <Column index={value} />)}
      </div>
    </SolutionLayout>
  );
};
