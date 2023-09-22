import React, { useState } from "react";
import { generateRandomArray } from "../../utils";
import { useFormInputs } from "../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {
  MAX_INPUT_LENGTH,
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
  MAX_ARR_LENGTH,
  MIN_ARR_LENGTH
).map(String);

export const ListPage: React.FC = () => {
  const [mappedArray, setMappedArray] = useState(randomArray);
  const { handleChange, values } = useFormInputs();

  const linkedList = new LinkedList<string>(randomArray);

  function handleAddToHead() {
    linkedList.prepend(values.valueToAdd);
    console.log(linkedList.toArray());
  }

  function handleAddToTail() {
    linkedList.append(values.valueToAdd);
    console.log(linkedList.toArray());
  }

  function handleDeleteFromHead() {
    linkedList.deleteHead();
    console.log(linkedList.toArray());
  }

  function handleDeleteFromTail() {
    linkedList.deleteTail();
    console.log(linkedList.toArray());
  }

  function handleAddByIndex() {
    linkedList.addByIndex(values.valueToAdd, Number(values.listIndex));
    console.log(linkedList.toArray());
  }

  function handleDeleteByIndex() {
    linkedList.deleteByIndex(Number(values.listIndex));
    console.log(linkedList.toArray());
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.upperRow}>
          <div>
            <Input
              name="valueToAdd"
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
            disabled={!values.valueToAdd}
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={handleAddToTail}
            linkedList="small"
            disabled={!values.valueToAdd}
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
            name="listIndex"
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
          />
          <Button
            text="Удалить по индексу"
            type="button"
            onClick={handleDeleteByIndex}
            linkedList="big"
          />
        </div>
        <ul className={styles.linkedListContainer}>
          {mappedArray &&
            mappedArray.map((el, index) => {
              return (
                <li className={styles.linkedListElement}>
                  <Circle letter={el + ""} extraClass="mr-12 ml-12" />
                  {index < mappedArray.length - 1 && <ArrowIcon />}
                </li>
              );
            })}
        </ul>
      </form>
    </SolutionLayout>
  );
};
