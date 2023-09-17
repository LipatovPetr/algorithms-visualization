import React, { useState, FormEvent } from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { useFormInputs } from "../hooks/useForm";

export const StackPage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [stack, setStack] = useState();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(values.stackElement);
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
    </SolutionLayout>
  );
};
