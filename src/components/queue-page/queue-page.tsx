import React, { FormEvent, useState } from "react";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_INPUT_LENGTH, QUEUE_LENGTH } from "./constants";
import { useFormInputs } from "../hooks/useForm";
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { HEAD, TAIL } from "../../constants/element-captions";
import { isHead, isTail } from "../../utils/helpers/queue.helpers";

const queue = new Queue<string>(QUEUE_LENGTH);

export const QueuePage: React.FC = () => {
  const { handleChange, values } = useFormInputs();
  const [queueArray, setQueueArray] = useState([...queue.getQueue()]);
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());
  const [queueLength, setQueueLength] = useState<number>(queue.getLength());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    queue.enqueue(values.queueElement);
    setQueueArray([...queue.getQueue()]);
    setTail(queue.getTail());
    setQueueLength(queue.getLength());
  }

  function handleDelete() {
    queue.dequeue();
    setQueueArray([...queue.getQueue()]);
    setHead(queue.getHead());
    setQueueLength(queue.getLength());
  }

  function handleClear() {
    queue.clear();
    setQueueArray([...queue.getQueue()]);
    setHead(queue.getHead());
    setTail(queue.getTail());
    setQueueLength(queue.getLength());
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.inputsContainer} onSubmit={handleSubmit}>
        <div className={styles.innerContainer}>
          <div>
            <Input
              name="queueElement"
              maxLength={MAX_INPUT_LENGTH}
              value={values.queueElement || ""}
              onChange={handleChange}
            />
            <p
              className={styles.caption}
            >{`Максимум — ${MAX_INPUT_LENGTH} символов`}</p>
          </div>
          <Button
            type="submit"
            text={"Добавить"}
            disabled={
              QUEUE_LENGTH === tail || !values.queueElement ? true : false
            }
          />
          <Button
            text={"Удалить"}
            onClick={handleDelete}
            disabled={!queueLength}
          />
        </div>
        <Button
          text={"Очистить"}
          onClick={handleClear}
          disabled={!queueLength}
        />
      </form>
      <div className={styles.queueContainer}>
        {queueArray &&
          queueArray.map((el, index) => {
            return (
              <Circle
                letter={el}
                index={index}
                head={isHead(queueLength, head, index)}
                tail={isTail(queueLength, tail, index)}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
