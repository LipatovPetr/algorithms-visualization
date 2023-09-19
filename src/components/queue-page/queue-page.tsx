import React, { FormEvent, useState } from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_INPUT_LENGTH, QUEUE_LENGTH } from "./constants";
import { useFormInputs } from "../hooks/useForm";
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";

const queue = new Queue<string>(QUEUE_LENGTH);

export const QueuePage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [queueArray, setQueueArray] = useState([...queue.getQueue()]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    queue.enqueue(values.queueElement);
    setQueueArray([...queue.getQueue()]);
    console.log(`tail ${queue.getTail()}`);
    console.log(`head ${queue.getHead()}`);
  }

  function handleDelete() {
    queue.dequeue();
    setQueueArray([...queue.getQueue()]);
  }

  function handleClear() {
    queue.clear();
    setQueueArray([...queue.getQueue()]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.inputsContainer} onSubmit={handleSubmit}>
        <div className={styles.innerContainer}>
          <Input
            name="queueElement"
            maxLength={MAX_INPUT_LENGTH}
            value={values.queueElement || ""}
            onChange={handleChange}
          />
          <Button
            type="submit"
            text={"Добавить"}
            // disabled={queueArray.length > 6 ? true : false}
          />
          <Button text={"Удалить"} onClick={handleDelete} />
        </div>
        <Button text={"Очистить"} onClick={handleClear} />
      </form>
      <div className={styles.queueContainer}>
        {queueArray &&
          queueArray.map((el, index) => {
            return <Circle letter={el} index={index} />;
          })}
      </div>
    </SolutionLayout>
  );
};
