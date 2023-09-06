import React, { FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_VALUE } from "./constants";
import { useFormInputs } from "../hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const { handleChange, values } = useFormInputs();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit");
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <Input
            type="number"
            name="value"
            value={values.value || ""}
            onChange={handleChange}
            max={19}
            min={0}
          />
          <p
            className={styles.caption}
          >{`Максимальное число — ${MAX_VALUE}`}</p>
        </div>
        <Button
          type="submit"
          extraClass={styles.submitButton}
          text="Рассчитать"
        />
      </form>
    </SolutionLayout>
  );
};
