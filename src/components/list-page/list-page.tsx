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
  changeNodeColor,
  highlightIncomingValue,
  setElementForRemoval,
} from "../../utils/helpers/linked-list.helpers";
import { useFormInputs } from "../../hooks/useForm";
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

export const ListPage: React.FC = () => {
  const [isLoding, setLoadingState] = useState(false);

  const [listModelArray, setListModel] =
    useState<linkedlistModelNode[]>(mappedArray);
  const { handleChange, values } = useFormInputs();
  let userInputValue = values.enteredValue;
  let userInputIndex = Number(values.enteredIndex);
  const linkedList = new LinkedList<string>(randomArray);

  async function handleAddToHead() {
    setLoadingState(true);

    // 1. List model operations
    const listModelCopy = [...listModelArray];

    // 1.1. Highlight incoming value
    highlightIncomingValue(listModelCopy, 0, userInputValue);
    setListModel(listModelCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. Remove highlighting and add value to the head with modified state
    highlightIncomingValue(listModelCopy, 0, null);
    addToHead(listModelCopy, userInputValue);
    setListModel([...listModelCopy]);

    await delay(SHORT_DELAY_IN_MS);

    // 1.3. Change value state from modified to default

    changeNodeColor(listModelCopy, 0);
    setListModel([...listModelCopy]);

    // 2. List operations
    linkedList.prepend(userInputValue);

    setLoadingState(false);
  }

  async function handleAddToTail() {
    setLoadingState(true);

    // 1. List model operations
    const listModelCopy = [...listModelArray];

    // 1.1. Highlight incoming value
    highlightIncomingValue(
      listModelCopy,
      listModelCopy.length - 1,
      userInputValue
    );
    setListModel(listModelCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. Remove highlighting and add value to the tail with modified state
    highlightIncomingValue(listModelCopy, listModelCopy.length - 1, null);
    addToTail(listModelCopy, userInputValue);
    setListModel([...listModelCopy]);

    await delay(SHORT_DELAY_IN_MS);

    // 1.3. Change value state from modified to default
    changeNodeColor(listModelCopy, listModelCopy.length - 1);
    setListModel([...listModelCopy]);

    // 2. List operations
    linkedList.append(userInputValue);

    setLoadingState(false);
  }

  async function handleDeleteFromHead() {
    setLoadingState(true);

    // 1. List model operations
    const listModelCopy = [...listModelArray];

    // 1.1. Highlight value to be deleted from head
    setElementForRemoval(listModelCopy, 0);
    setListModel(listModelCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. Deleted value from head
    listModelCopy.shift();
    setListModel([...listModelCopy]);

    // 2. List operations
    linkedList.deleteHead();

    setLoadingState(false);
  }

  async function handleDeleteFromTail() {
    setLoadingState(true);

    // 1. List model operations
    const listModelCopy = [...listModelArray];

    // 1.1. Highlight value to be deleted from tail
    setElementForRemoval(listModelCopy, listModelCopy.length - 1);
    setListModel(listModelCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.2. Deleted value from tail
    listModelCopy.pop();
    setListModel([...listModelCopy]);

    // 2. List operations
    linkedList.deleteTail();

    setLoadingState(false);
  }

  async function handleAddByIndex() {
    setLoadingState(true);

    // 1. List model operations
    if (isWithinListSize(userInputIndex, listModelArray)) {
      const listModelCopy = [...listModelArray];

      // 1.1. Loop though list highlighting elements up to entered index
      for (let i = 0; i <= userInputIndex; i++) {
        listModelCopy[i].incomingValue = userInputValue;

        if (i > 0) {
          listModelCopy[i - 1].incomingValue = null;
          listModelCopy[i - 1].state = ElementStates.Changing;
        }
        setListModel([...listModelCopy]);
        await delay(SHORT_DELAY_IN_MS);
      }

      // 1.2. Add value by index, clear incoming value and set modified state
      await delay(SHORT_DELAY_IN_MS);
      addByIndex(listModelCopy, userInputIndex, userInputValue);
      highlightIncomingValue(listModelCopy, userInputIndex + 1, null);
      setListModel([...listModelCopy]);

      await delay(SHORT_DELAY_IN_MS);

      // 1.3. Clear highlighting state set in a 1.1. loop
      for (let i = 0; i < userInputIndex; i++) {
        listModelCopy[i].state = ElementStates.Default;
        setListModel([...listModelCopy]);
      }

      // 1.4. Change value state from modified to default
      changeNodeColor(listModelCopy, userInputIndex);
      setListModel([...listModelCopy]);
    }

    // 2. list operations
    linkedList.addByIndex(userInputValue, userInputIndex);
    console.log(linkedList.toArray());

    setLoadingState(false);
  }

  async function handleDeleteByIndex() {
    setLoadingState(true);

    // 1. List model operations
    const listModelCopy = [...listModelArray];

    // 1.1. Loop though list highlighting elements up to entered index
    for (let i = 0; i <= userInputIndex; i++) {
      if (i > 0) {
        listModelCopy[i - 1].state = ElementStates.Changing;
      }
      setListModel([...listModelCopy]);
      await delay(SHORT_DELAY_IN_MS);

      setListModel([...listModelCopy]);
    }

    // 1.2. Highlight element as being removed
    setElementForRemoval(listModelCopy, userInputIndex);
    setListModel([...listModelCopy]);

    await delay(SHORT_DELAY_IN_MS);

    // 1.3. Remove value by index
    listModelCopy.splice(userInputIndex, 1);
    setListModel(listModelCopy);

    await delay(SHORT_DELAY_IN_MS);

    // 1.4. Clear highlighting state set in a 1.1. loop

    for (let i = 0; i < userInputIndex; i++) {
      listModelCopy[i].state = ElementStates.Default;
      setListModel([...listModelCopy]);
    }

    // 2. List operations
    linkedList.deleteByIndex(Number(userInputIndex));
    console.log(linkedList.toArray());

    setLoadingState(false);
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.upperRow}>
          <Input
            name="enteredValue"
            value={values.enteredValue || ""}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
            extraClass={styles.input}
            placeholder="Введите значение"
            isLimitText
          />

          <Button
            text="Добавить в head"
            type="button"
            onClick={handleAddToHead}
            linkedList="small"
            isLoader={isLoding}
            disabled={
              !userInputValue || listModelArray.length >= MAX_ARR_LENGTH
            }
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={handleAddToTail}
            linkedList="small"
            isLoader={isLoding}
            disabled={
              !userInputValue || listModelArray.length >= MAX_ARR_LENGTH
            }
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={handleDeleteFromHead}
            linkedList="small"
            isLoader={isLoding}
            disabled={listModelArray.length < 1}
          />
          <Button
            text="Удалить из tail"
            type="button"
            onClick={handleDeleteFromTail}
            linkedList="small"
            isLoader={isLoding}
            disabled={listModelArray.length < 1}
          />
        </div>
        <div className={styles.bottomRow}>
          <Input
            name="enteredIndex"
            type="number"
            value={values.enteredIndex || ""}
            min={0}
            max={listModelArray.length - 1}
            onChange={handleChange}
            extraClass={styles.input}
            placeholder="Введите индекс"
          />
          <Button
            text="Добавить по индексу"
            type="button"
            onClick={handleAddByIndex}
            linkedList="big"
            isLoader={isLoding}
            disabled={
              !values.enteredValue ||
              !values.enteredIndex ||
              listModelArray.length >= MAX_ARR_LENGTH ||
              userInputIndex > listModelArray.length - 1 ||
              userInputIndex < 0
            }
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={handleDeleteByIndex}
            linkedList="big"
            isLoader={isLoding}
            disabled={
              !values.enteredIndex ||
              listModelArray.length < 1 ||
              userInputIndex > listModelArray.length - 1 ||
              userInputIndex < 0
            }
          />
        </div>
        <ul className={styles.linkedListContainer}>
          {listModelArray &&
            listModelArray.map((el, index) => {
              return (
                <li className={styles.linkedListElement} key={index}>
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
