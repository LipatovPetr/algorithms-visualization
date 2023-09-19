import React, { FormEvent, useState } from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_INPUT_LENGTH, QUEUE_LENGTH } from "./constants";
import { useFormInputs } from "../hooks/useForm";
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { TAIL } from "../../constants/element-captions";

const queue = new Queue<string>(QUEUE_LENGTH);

export const QueuePage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [queueArray, setQueueArray] = useState([...queue.getQueue()]);
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    queue.enqueue(values.queueElement);
    setQueueArray([...queue.getQueue()]);
    setTail(queue.getTail());
  }

  function handleDelete() {
    queue.dequeue();
    setQueueArray([...queue.getQueue()]);
    setHead(queue.getHead());
  }

  function handleClear() {
    queue.clear();
    setQueueArray([...queue.getQueue()]);
    setHead(queue.getHead());
    setTail(queue.getTail());
  }

  function isTail(index: number) {
    return index === tail - 1 ? TAIL : "";
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.inputsContainer} onSubmit={handleSubmit}>
        <span>tail {tail}</span>
        <span>head {head}</span>
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
            disabled={!values.queueElement}
          />
          <Button text={"Удалить"} onClick={handleDelete} />
        </div>
        <Button text={"Очистить"} onClick={handleClear} />
      </form>
      <div className={styles.queueContainer}>
        {queueArray &&
          queueArray.map((el, index) => {
            return <Circle letter={el} index={index} tail={isTail(index)} />;
          })}
      </div>
    </SolutionLayout>
  );
};
