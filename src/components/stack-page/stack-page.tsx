import React, { useState, FormEvent } from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { useFormInputs } from "../../hooks/useForm";
import { stack } from "./stack";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { isHead } from "../../utils/helpers/stack.helpers";
import { delay, setColorState } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage = () => {
  const [isLoding, setLoadingState] = useState({
    addition: false,
    deletion: false,
  });
  const { handleChange, values } = useFormInputs();
  const [stackArray, setStackArray] = useState<string[]>([]);
  const [lastElementIndex, setLastElementIndex] = useState<number>(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoadingState((prevState) => ({ ...prevState, addition: true }));

    stack.push(values.stackElement);
    values.stackElement = "";
    setStackArray([...stack.getStack()]);

    await delay(SHORT_DELAY_IN_MS);

    setLastElementIndex(lastElementIndex + 1);

    setLoadingState((prevState) => ({ ...prevState, addition: false }));
  }

  async function handleDelete() {
    setLoadingState((prevState) => ({ ...prevState, deletion: true }));

    setLastElementIndex(lastElementIndex - 1);

    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackArray([...stack.getStack()]);

    setLoadingState((prevState) => ({ ...prevState, deletion: false }));
  }

  function handleClear() {
    stack.clear();
    setStackArray([...stack.getStack()]);
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={handleSubmit} className={styles.inputsContainer}>
        <div className={styles.innerContainer}>
          <Input
            name="stackElement"
            maxLength={MAX_LENGTH}
            value={values.stackElement || ""}
            onChange={handleChange}
            isLimitText
          />

          <Button
            text={"Добавить"}
            type="submit"
            isLoader={isLoding.addition}
            disabled={values.stackElement ? false : true}
            data-test="submit-button"
          />
          <Button
            text={"Удалить"}
            type="button"
            onClick={handleDelete}
            isLoader={isLoding.deletion}
            disabled={stackArray.length ? false : true}
            data-test="remove-button"
          />
        </div>
        <Button
          text={"Очистить"}
          type="reset"
          onClick={handleClear}
          disabled={stackArray.length ? false : true}
          data-test="clear-button"
        />
      </form>
      <div className={styles.stackContainer}>
        {stackArray &&
          stackArray.map((el, index) => (
            <Circle
              letter={el}
              index={index}
              key={index}
              head={isHead(stackArray, index) ? "top" : null}
              state={setColorState(index, lastElementIndex)}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
