import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import {
  addStatestoArrayElement,
  animateSequence,
} from "../../utils/helpers/sorting.helpers";
import { generateRandomArray } from "../../utils";
import { createSelectSortSeq, createbBubbleSortSeq } from "./algorithms";
import { elementWithState } from "./Types";
import { MIN_NUMBER, MAX_NUMBER, MIN_LENGTH, MAX_LENGTH } from "./constants";

export const SortingPage = () => {
  const [isLoding, setLoadingState] = useState({
    ascendingSort: false,
    descendingSort: false,
  });
  const [sortingOption, setSortingOption] = useState("select");
  const [sortedArray, setSortedArray] = useState<Array<elementWithState>>([]);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingOption(e.target.value);
  };

  useEffect(function generateArrayOnLoad() {
    const randomArray = generateRandomArray(
      MIN_NUMBER,
      MAX_NUMBER,
      MIN_LENGTH,
      MAX_LENGTH
    );
    const arrayWithStates = addStatestoArrayElement(randomArray);
    setSortedArray(arrayWithStates);
  }, []);

  async function handleSortAcs() {
    setLoadingState((prevState) => ({
      ...prevState,
      ascendingSort: true,
    }));
    switch (sortingOption) {
      case "select":
        const selectSequence = createSelectSortSeq(sortedArray, "asc");
        await animateSequence(selectSequence, setSortedArray);
        break;
      case "bubble":
        const bubbleSequence = createbBubbleSortSeq(sortedArray, "asc");
        await animateSequence(bubbleSequence, setSortedArray);
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
        const selectSequence = createSelectSortSeq(sortedArray, "desc");
        await animateSequence(selectSequence, setSortedArray);
        break;
      case "bubble":
        const bubbleSequence = createbBubbleSortSeq(sortedArray, "desc");
        await animateSequence(bubbleSequence, setSortedArray);
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
    const mappedArray = addStatestoArrayElement(randomArray);
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
          sortedArray.map((el, index) => (
            <Column index={el.value} state={el.state} key={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
