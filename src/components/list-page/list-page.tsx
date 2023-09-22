import React, { useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay, generateRandomArray } from "../../utils";
import { isWithinListSize } from "../../utils/helpers/linked-list.helpers";
import { useFormInputs } from "../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {
  MAX_INPUT_LENGTH,
  ARR_LENGTH,
  MAX_ARR_LENGTH,
  MIN_ARR_LENGTH,
  MAX_ARR_NUMBER,
  MIN_ARR_NUMBER,
} from "./constants";
import { LinkedList } from "./LinkedList";
import styles from "./list-page.module.css";

export type linkedlistModelNode = {
  value: string;
  state: ElementStates;
  incomingValue: null | string;
};

const randomArray: Array<string> = generateRandomArray(
  MIN_ARR_NUMBER,
  MAX_ARR_NUMBER,
  ARR_LENGTH,
  MIN_ARR_LENGTH
).map(String);

const mappedArray: Array<linkedlistModelNode> = randomArray.map((element) => ({
  value: element,
  state: ElementStates.Default,
  incomingValue: null,
}));

function addToHead(
  arr: Array<linkedlistModelNode>,
  inputValue: string,
  colorState = ElementStates.Modified
) {
  arr.unshift({
    value: inputValue,
    state: colorState,
    incomingValue: null,
  });
}

function addToTail(
  arr: Array<linkedlistModelNode>,
  inputValue: string,
  colorState = ElementStates.Modified
) {
  arr.push({
    value: inputValue,
    state: colorState,
    incomingValue: null,
  });
}

function addByIndex(
  arr: Array<linkedlistModelNode>,
  inputIndex: number,
  inputValue: string,
  colorState = ElementStates.Modified
) {
  arr.splice(inputIndex, 0, {
    value: inputValue,
    state: colorState,
    incomingValue: null,
  });
}

function changeColorState(arr: Array<linkedlistModelNode>, index: number) {
  arr[index].state = ElementStates.Default;
}

function setIncomingValue(
  arr: Array<linkedlistModelNode>,
  index: number,
  inputValue: string | null
) {
  arr[index].incomingValue = inputValue;
}

function setElementForRemoval(arr: Array<linkedlistModelNode>, index: number) {
  const el = arr[index].value;
  arr[index] = {
    value: "",
    state: ElementStates.Default,
    incomingValue: el,
  };
}

export const ListPage: React.FC = () => {
  const [listModelArray, setListModelArray] =
    useState<linkedlistModelNode[]>(mappedArray);
  const { handleChange, values } = useFormInputs();
  let userInputValue = values.enteredValue;
  let userInputIndex = Number(values.enteredIndex);
  const linkedList = new LinkedList<string>(randomArray);

  async function handleAddToHead() {
    // 1. list model operations
    const arrayCopy = [...listModelArray];

    // 1.1. highlight incoming value
    setIncomingValue(arrayCopy, 0, userInputValue);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. remove highlighting and add value to the head with modified state
    setIncomingValue(arrayCopy, 0, null);
    addToHead(arrayCopy, userInputValue);
    setListModelArray([...arrayCopy]);

    await delay(SHORT_DELAY_IN_MS);

    // 1.3. change value state from modified to default

    changeColorState(arrayCopy, 0);
    setListModelArray([...arrayCopy]);

    // 2. list operations
    linkedList.prepend(userInputValue);
    console.log(linkedList.toArray());
  }

  async function handleAddToTail() {
    // 1. list model operations
    const arrayCopy = [...listModelArray];

    // 1.1. highlight incoming value
    setIncomingValue(arrayCopy, arrayCopy.length - 1, userInputValue);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. remove highlighting and add value to the tail with modified state
    setIncomingValue(arrayCopy, arrayCopy.length - 1, null);
    addToTail(arrayCopy, userInputValue);
    setListModelArray([...arrayCopy]);

    await delay(SHORT_DELAY_IN_MS);

    // 1.3. change value state from modified to default
    changeColorState(arrayCopy, arrayCopy.length - 1);
    setListModelArray([...arrayCopy]);

    // 2. list operations
    linkedList.append(userInputValue);
    console.log(linkedList.toArray());
  }

  async function handleDeleteFromHead() {
    // list model operations
    const arrayCopy = [...listModelArray];

    setElementForRemoval(arrayCopy, 0);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    arrayCopy.shift();
    setListModelArray([...arrayCopy]);

    // list operations
    linkedList.deleteHead();
    console.log(linkedList.toArray());
  }

  async function handleDeleteFromTail() {
    // list model operations
    const arrayCopy = [...listModelArray];

    setElementForRemoval(arrayCopy, arrayCopy.length - 1);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    arrayCopy.pop();
    setListModelArray([...arrayCopy]);

    // list operations
    linkedList.deleteTail();
    console.log(linkedList.toArray());
  }

  async function handleAddByIndex() {
    // list model operations
    if (isWithinListSize(userInputIndex, listModelArray)) {
      const arrayCopy = [...listModelArray];
      addByIndex(arrayCopy, userInputIndex, userInputValue);
      setListModelArray(arrayCopy);

      await delay(SHORT_DELAY_IN_MS);

      changeColorState(arrayCopy, userInputIndex);
      setListModelArray([...arrayCopy]);
    }

    // list operations
    linkedList.addByIndex(userInputValue, userInputIndex);
    console.log(linkedList.toArray());
  }

  function handleDeleteByIndex() {
    // list model operations
    const arrayCopy = [...listModelArray];
    arrayCopy.splice(Number(userInputIndex), 1);
    setListModelArray(arrayCopy);

    // list operations
    linkedList.deleteByIndex(Number(userInputIndex));
    console.log(linkedList.toArray());
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.upperRow}>
          <div>
            <Input
              name="enteredValue"
              onChange={handleChange}
              extraClass={styles.input}
              placeholder="Введите значение"
            />
            <p
              className={styles.caption}
            >{`Максимум — ${MAX_INPUT_LENGTH} символов`}</p>
          </div>
          <Button
            text="Добавить в head"
            type="button"
            onClick={handleAddToHead}
            linkedList="small"
            disabled={
              !userInputValue || listModelArray.length >= MAX_ARR_LENGTH
            }
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={handleAddToTail}
            linkedList="small"
            disabled={
              !userInputValue || listModelArray.length >= MAX_ARR_LENGTH
            }
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={handleDeleteFromHead}
            linkedList="small"
            disabled={listModelArray.length < 1}
          />
          <Button
            text="Удалить из tail"
            type="button"
            onClick={handleDeleteFromTail}
            linkedList="small"
            disabled={listModelArray.length < 1}
          />
        </div>
        <div className={styles.bottomRow}>
          <Input
            name="enteredIndex"
            type="number"
            min={0}
            onChange={handleChange}
            extraClass={styles.input}
            placeholder="Введите индекс"
          />
          <Button
            text="Добавить по индексу"
            type="button"
            onClick={handleAddByIndex}
            linkedList="big"
            disabled={
              !values.enteredIndex || listModelArray.length >= MAX_ARR_LENGTH
            }
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={handleDeleteByIndex}
            linkedList="big"
            disabled={
              !values.enteredIndex || listModelArray.length >= MAX_ARR_LENGTH
            }
          />
        </div>
        <ul className={styles.linkedListContainer}>
          {listModelArray &&
            listModelArray.map((el, index) => {
              return (
                <li className={styles.linkedListElement}>
                  {el.incomingValue && (
                    <Circle
                      extraClass={styles.secondaryCircle}
                      state={ElementStates.Changing}
                      letter={el.incomingValue}
                      isSmall
                    />
                  )}
                  <Circle
                    letter={el.value}
                    state={el.state}
                    index={index}
                    extraClass="mr-12 ml-12"
                  />
                  {index < listModelArray.length - 1 && <ArrowIcon />}
                </li>
              );
            })}
        </ul>
      </form>
    </SolutionLayout>
  );
};
