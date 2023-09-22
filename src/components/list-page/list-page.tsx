import React, { useState } from "react";
import { generateRandomArray } from "../../utils";
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

const randomArray = generateRandomArray(
  MIN_ARR_NUMBER,
  MAX_ARR_NUMBER,
  ARR_LENGTH,
  MIN_ARR_LENGTH
).map(String);

export const ListPage: React.FC = () => {
  const [mappedArray, setMappedArray] = useState<string[]>(randomArray);
  const { handleChange, values } = useFormInputs();
  let userInputValue = values.enteredValue;
  let userInputIndex = Number(values.enteredIndex);
  const linkedList = new LinkedList<string>(randomArray);

  function handleAddToHead() {
    // list model operations
    const arrayCopy = [...mappedArray];
    arrayCopy.unshift(userInputValue);
    setMappedArray(arrayCopy);

    // list operations
    linkedList.prepend(userInputValue);
    console.log(linkedList.toArray());
  }

  function handleAddToTail() {
    // list model operations
    const arrayCopy = [...mappedArray];
    arrayCopy.push(userInputValue);
    setMappedArray(arrayCopy);

    // list operations
    linkedList.append(userInputValue);
    console.log(linkedList.toArray());
  }

  function handleDeleteFromHead() {
    // list model operations
    const arrayCopy = [...mappedArray];
    arrayCopy.shift();
    setMappedArray(arrayCopy);

    // list operations
    linkedList.deleteHead();
    console.log(linkedList.toArray());
  }

  function handleDeleteFromTail() {
    // list model operations
    const arrayCopy = [...mappedArray];
    arrayCopy.pop();
    setMappedArray(arrayCopy);

    // list operations
    linkedList.deleteTail();
    console.log(linkedList.toArray());
  }

  function handleAddByIndex() {
    // list model operations
    if (isWithinListSize(userInputIndex, mappedArray)) {
      const arrayCopy = [...mappedArray];
      arrayCopy[userInputIndex] = userInputValue;
      setMappedArray(arrayCopy);
    }

    // list operations
    linkedList.addByIndex(userInputValue, userInputIndex);
    console.log(linkedList.toArray());
  }

  function handleDeleteByIndex() {
    // list model operations
    const arrayCopy = [...mappedArray];
    arrayCopy.splice(Number(userInputIndex), 1);
    setMappedArray(arrayCopy);

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
            disabled={!userInputValue && mappedArray.length >= MAX_ARR_LENGTH}
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={handleAddToTail}
            linkedList="small"
            disabled={!userInputValue && mappedArray.length >= MAX_ARR_LENGTH}
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={handleDeleteFromHead}
            linkedList="small"
          />
          <Button
            text="Удалить из tail"
            type="button"
            onClick={handleDeleteFromTail}
            linkedList="small"
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
            disabled={!userInputIndex}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={handleDeleteByIndex}
            linkedList="big"
            disabled={!userInputIndex}
          />
        </div>
        <ul className={styles.linkedListContainer}>
          {mappedArray &&
            mappedArray.map((el, index) => {
              return (
                <li className={styles.linkedListElement}>
                  <Circle letter={el} extraClass="mr-12 ml-12" />
                  {index < mappedArray.length - 1 && <ArrowIcon />}
                </li>
              );
            })}
        </ul>
      </form>
    </SolutionLayout>
  );
};
