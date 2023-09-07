import React from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputsContainer}>
        <div className={styles.radioContainer}>
          <RadioInput label={"Выбор"} />
          <RadioInput label={"Пузырёк"} />
        </div>

        <div className={styles.filtersContainer}>
          <Button text={"По возрастанию"} sorting={Direction.Descending} />
          <Button text={"По убыванию"} sorting={Direction.Descending} />
        </div>

        <Button text={"Новый массив"} />
      </div>
    </SolutionLayout>
  );
};
