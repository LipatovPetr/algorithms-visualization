import React, { FormEvent, useEffect, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_VALUE } from "./constants";
import { useFormInputs } from "../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils";
import { DELAY_IN_MS } from "../../constants/delays";

const arr: number[] = [];

export const FibonacciPage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [fibArray, setFibArray] = useState<number[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    generateFibonacciSequence(Number(values.value));
  }

  function calculateFibonacci(num: number): number {
    if (num < 2) {
      return num;
    }
    const fibValue = calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
    return fibValue;
  }

  const generateFibonacciSequence = async (length: number) => {
    const sequence: number[] = [];

    for (let i = 0; i <= length; i++) {
      const fibValue = await calculateFibonacci(i);
      sequence.push(fibValue);
      console.log(sequence);
      setFibArray([...sequence]);
      await delay(DELAY_IN_MS);
    }
  };

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
      <div className={styles.circlesContainer}>
        {fibArray &&
          fibArray.map((el, index) => (
            <Circle letter={`${el}`} index={index} key={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
