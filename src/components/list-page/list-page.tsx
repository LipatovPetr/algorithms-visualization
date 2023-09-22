import React, { useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { linkedlistModelNode } from "./types";
import { delay, generateRandomArray } from "../../utils";
import {
  isWithinListSize,
  addByIndex,
  addToHead,
  addToTail,
  changeColorState,
  setIncomingValue,
  setElementForRemoval,
} from "../../utils/helpers/linked-list.helpers";
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

function loopHighlightingToIndex() {}

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
    // 1. list model operations
    const arrayCopy = [...listModelArray];

    // 1.1. highlight value to be deleted from head
    setElementForRemoval(arrayCopy, 0);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. deleted value from head
    arrayCopy.shift();
    setListModelArray([...arrayCopy]);

    // 2. list operations
    linkedList.deleteHead();
    console.log(linkedList.toArray());
  }

  async function handleDeleteFromTail() {
    // 1. list model operations
    const arrayCopy = [...listModelArray];

    // 1.1. highlight value to be deleted from tail
    setElementForRemoval(arrayCopy, arrayCopy.length - 1);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. deleted value from tail
    arrayCopy.pop();
    setListModelArray([...arrayCopy]);

    // 2. list operations
    linkedList.deleteTail();
    console.log(linkedList.toArray());
  }

  async function handleAddByIndex() {
    // list model operations
    if (isWithinListSize(userInputIndex, listModelArray)) {
      const arrayCopy = [...listModelArray];

      for (let i = 0; i <= userInputIndex; i++) {
        arrayCopy[i].incomingValue = userInputValue;

        if (i > 0) {
          arrayCopy[i - 1].incomingValue = null;
          arrayCopy[i - 1].state = ElementStates.Changing;
        }
        setListModelArray([...arrayCopy]);
        await delay(SHORT_DELAY_IN_MS);

        setListModelArray([...arrayCopy]);
      }

      await delay(SHORT_DELAY_IN_MS);

      addByIndex(arrayCopy, userInputIndex, userInputValue);
      setIncomingValue(arrayCopy, userInputIndex + 1, null);
      setListModelArray([...arrayCopy]);

      await delay(SHORT_DELAY_IN_MS);

      for (let i = 0; i < userInputIndex; i++) {
        arrayCopy[i].state = ElementStates.Default;
        setListModelArray([...arrayCopy]);
      }

      changeColorState(arrayCopy, userInputIndex);
      setListModelArray([...arrayCopy]);
    }

    // list operations
    linkedList.addByIndex(userInputValue, userInputIndex);
    console.log(linkedList.toArray());
  }

  async function handleDeleteByIndex() {
    // list model operations
    const arrayCopy = [...listModelArray];

    for (let i = 0; i <= userInputIndex; i++) {
      if (i > 0) {
        arrayCopy[i - 1].state = ElementStates.Changing;
      }
      setListModelArray([...arrayCopy]);
      await delay(SHORT_DELAY_IN_MS);

      setListModelArray([...arrayCopy]);
    }

    setElementForRemoval(arrayCopy, userInputIndex);
    setListModelArray([...arrayCopy]);

    await delay(SHORT_DELAY_IN_MS);

    arrayCopy.splice(Number(userInputIndex), 1);
    setListModelArray(arrayCopy);

    await delay(SHORT_DELAY_IN_MS);

    for (let i = 0; i < userInputIndex; i++) {
      arrayCopy[i].state = ElementStates.Default;
      setListModelArray([...arrayCopy]);
    }

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
              !values.enteredValue ||
              !values.enteredIndex ||
              listModelArray.length >= MAX_ARR_LENGTH
            }
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={handleDeleteByIndex}
            linkedList="big"
            disabled={!values.enteredIndex || listModelArray.length < 1}
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
