import React, { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { mapArray } from "../../utils/helpers/sorting.helpers";
import { generateRandomArray } from "../../utils";
import { selectSort, bubbleSort } from "./algorithm";
import { elementWithState } from "./Types";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MIN_NUMBER, MAX_NUMBER, MIN_LENGTH, MAX_LENGTH } from "./constants";

export const SortingPage: React.FC = () => {
  const [isLoding, setLoadingState] = useState({
    ascendingSort: false,
    descendingSort: false,
  });
  const [sortingOption, setSortingOption] = useState("select");
  const [sortedArray, setSortedArray] = useState<Array<elementWithState>>([]);

  useEffect(function generateArrayOnLoad() {
    const randomArray = generateRandomArray(
      MIN_NUMBER,
      MAX_NUMBER,
      MIN_LENGTH,
      MAX_LENGTH
    );
    const mappedArray = mapArray(randomArray);
    setSortedArray(mappedArray);
  }, []);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingOption(e.target.value);
  };

  async function handleSortAcs() {
    setLoadingState((prevState) => ({
      ...prevState,
      ascendingSort: true,
    }));
    switch (sortingOption) {
      case "select":
        await selectSort(sortedArray, setSortedArray, 100, "asc");
        break;
      case "bubble":
        await bubbleSort(sortedArray, setSortedArray, 100, "asc");
        break;
    }
    setLoadingState((prevState) => ({
      ...prevState,
      ascendingSort: false,
    }));
  }

  async function handleSortDesc() {
    setLoadingState((prevState) => ({
      ...prevState,
      descendingSort: true,
    }));

    switch (sortingOption) {
      case "select":
        await selectSort(sortedArray, setSortedArray, 100, "desc");
        break;
      case "bubble":
        await bubbleSort(sortedArray, setSortedArray, 100, "desc");
        break;
    }
    setLoadingState((prevState) => ({
      ...prevState,
      descendingSort: false,
    }));
  }

  const handleGenerateNewArrayClick = (e: MouseEvent<HTMLButtonElement>) => {
    const randomArray = generateRandomArray(
      MIN_NUMBER,
      MAX_NUMBER,
      MIN_LENGTH,
      MAX_LENGTH
    );
    const mappedArray = mapArray(randomArray);
    setSortedArray(mappedArray);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.inputsContainer}>
        <div className={styles.radioContainer}>
          <RadioInput
            name="sorting"
            label={"Выбор"}
            value="select"
            onChange={handleRadioChange}
            checked={sortingOption === "select"}
          />
          <RadioInput
            name="sorting"
            label={"Пузырёк"}
            value="bubble"
            onChange={handleRadioChange}
            checked={sortingOption === "bubble"}
          />
        </div>

        <div className={styles.filtersContainer}>
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            onClick={handleSortAcs}
            isLoader={isLoding.ascendingSort}
            disabled={isLoding.descendingSort}
          />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            onClick={handleSortDesc}
            isLoader={isLoding.descendingSort}
            disabled={isLoding.ascendingSort}
          />
        </div>

        <Button
          text={"Новый массив"}
          onClick={handleGenerateNewArrayClick}
          disabled={isLoding.ascendingSort || isLoding.descendingSort}
        />
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
