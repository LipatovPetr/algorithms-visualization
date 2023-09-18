import React from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_LENGTH } from "./constants";
import { useFormInputs } from "../hooks/useForm";

export const QueuePage: React.FC = () => {
  const { handleChange, values } = useFormInputs();

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.inputsContainer}>
        <div className={styles.innerContainer}>
          <Input
            name="queueElement"
            maxLength={MAX_LENGTH}
            value={values.queueElement || ""}
            onChange={handleChange}
          />
          <Button text={"Добавить"} />
          <Button text={"Удалить"} />
        </div>
        <Button text={"Очистить"} />
      </div>
    </SolutionLayout>
  );
};
