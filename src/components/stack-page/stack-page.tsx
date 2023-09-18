import React, { useState, FormEvent } from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { useFormInputs } from "../hooks/useForm";
import { stack } from "./algorithm";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [stackArray, setStackArray] = useState<string[]>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    stack.push(values.stackElement);

    setStackArray([...stack.getStack()]);
  }

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={handleSubmit} className={styles.inputsContainer}>
        <div className={styles.innerContainer}>
          <Input
            name="stackElement"
            value={values.stackElement || ""}
            onChange={handleChange}
          />
          <Button type="submit" text={"Добавить"} />
          <Button text={"Удалить"} />
        </div>
        <Button text={"Очистить"} />
      </form>
      <div className={styles.stackContainer}>
        {stackArray &&
          stackArray.map((el, index) => <Circle letter={el} index={index} />)}
      </div>
    </SolutionLayout>
  );
};
