import React, { useState } from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_LENGTH } from "./constants";
import { useFormInputs } from "../hooks/useForm";
import { queue } from "./algorithm";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [queueArray, setQueueArray] = useState([...queue.getQueue()]);

  function handleClear() {
    console.log(queueArray);
  }

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
        <Button text={"Очистить"} onClick={handleClear} />
      </div>
      <div className={styles.queueContainer}>
        {queueArray &&
          queueArray.map((el, index) => {
            return <Circle letter={el} index={index} />;
          })}
      </div>
    </SolutionLayout>
  );
};
