import React, { useState, FormEvent, MouseEventHandler } from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { useFormInputs } from "../hooks/useForm";
import { stack } from "./algorithm";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { isHead } from "../../utils/helpers/stack.helpers";

export const StackPage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [stackArray, setStackArray] = useState<string[]>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    stack.push(values.stackElement);

    setStackArray([...stack.getStack()]);
    values.stackElement = "";
  }

  function handleDelete() {
    stack.pop();
    setStackArray([...stack.getStack()]);
  }

  function handleClear() {
    stack.clear();
    setStackArray([...stack.getStack()]);
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={handleSubmit} className={styles.inputsContainer}>
        <div className={styles.innerContainer}>
          <div>
            <Input
              name="stackElement"
              maxLength={MAX_LENGTH}
              value={values.stackElement || ""}
              onChange={handleChange}
            />
            <p
              className={styles.caption}
            >{`Максимум — ${MAX_LENGTH} символов`}</p>
          </div>
          <Button
            text={"Добавить"}
            type="submit"
            disabled={values.stackElement ? false : true}
          />
          <Button text={"Удалить"} onClick={handleDelete} />
        </div>
        <Button text={"Очистить"} onClick={handleClear} />
      </form>
      <div className={styles.stackContainer}>
        {stackArray &&
          stackArray.map((el, index) => (
            <Circle
              letter={el}
              index={index}
              head={isHead(stackArray, index) ? "top" : null}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
