import React, { useState } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("Select");

  const handleRadioChange = (e: any) => {
    console.log(e.target);
    setSelectedOption(e.target.value);
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
            checked={selectedOption === "Select"}
          />
          <RadioInput
            name="sorting"
            label={"Пузырёк"}
            value="Buble"
            onChange={handleRadioChange}
            checked={selectedOption === "Buble"}
          />
        </div>

        <div className={styles.filtersContainer}>
          <Button text={"По возрастанию"} sorting={Direction.Ascending} />
          <Button text={"По убыванию"} sorting={Direction.Descending} />
        </div>

        <Button text={"Новый массив"} />
      </div>
    </SolutionLayout>
  );
};
