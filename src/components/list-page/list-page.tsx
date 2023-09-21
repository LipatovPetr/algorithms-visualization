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
import { LinkedList } from "./linked-list";
import styles from "./list-page.module.css";

const randomArray = generateRandomArray(
  MIN_ARR_NUMBER,
  MAX_ARR_NUMBER,
  MAX_ARR_LENGTH,
  MIN_ARR_LENGTH
);

export const ListPage: React.FC = () => {
  const [mappedArray, setMappedArray] = useState(randomArray);
  const { handleChange, values } = useFormInputs();

  const linkedList = new LinkedList<number | string>(randomArray);

  function handleAddToHead() {}

  function handleAddToTail() {}

  function handleRemoveFromHead() {}

  function handleRemoveFromTail() {}

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
          />
          <Button
            text="Добавить в tail"
            type="button"
            onClick={handleAddToTail}
            linkedList="small"
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={handleRemoveFromHead}
            linkedList="small"
          />
          <Button
            text="Удалить из tail"
            type="button"
            onClick={handleRemoveFromTail}
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
          <Button text="Добавить в head" linkedList="big" />
          <Button text="Добавить в tail" linkedList="big" />
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
