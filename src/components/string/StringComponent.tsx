import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { stringMappedToCharsWithState } from "./types";
import { createReverseStringSeq, reverseString } from "./algorithm";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormInputs } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

export const StringComponent = () => {
  const [isLoding, setLoadingState] = useState(false);
  const [mappedString, setMappedString] =
    useState<stringMappedToCharsWithState>([]);
  const { handleChange, values } = useFormInputs();

  async function animateAlgo(sequence: stringMappedToCharsWithState[]) {
    for (const step of sequence) {
      setMappedString([...step]);
      await delay(DELAY_IN_MS);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingState(true);
    const animationSequence = createReverseStringSeq(values.string);
    await animateAlgo(animationSequence);
    setLoadingState(false);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="string"
          value={values.string || ""}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          isLimitText
        />

        <Button
          type="submit"
          extraClass={styles.submitButton}
          text="Развернуть"
          disabled={!values.string}
          isLoader={isLoding}
        />
      </form>

      <div className={styles.circlesContainer}>
        {mappedString &&
          mappedString.map((el, index) => (
            <Circle letter={el.character} state={el.state} key={index} />
          ))}
      </div>
    </SolutionLayout>
  );
};
