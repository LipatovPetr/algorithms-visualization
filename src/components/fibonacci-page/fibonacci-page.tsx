import React from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_VALUE } from "./constants";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={styles.form}
        onSubmit={() => {
          console.log("hadleSubmit");
        }}
      >
        <div className={styles.inputContainer}>
          <Input
            name="string"
            // value={values.string || ""}
            // onChange={handleChange}
            // maxLength={MAX_LENGTH}
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
