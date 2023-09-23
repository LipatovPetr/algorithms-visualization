import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { stringMappedToCharsWithState } from "./types";
import { mapStringToArray, reverseString, swapChars } from "./algorithm";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormInputs } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [mappedString, setMappedString] =
    useState<stringMappedToCharsWithState>([]);
  const { handleChange, values } = useFormInputs();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reverseString(values.string, setMappedString, DELAY_IN_MS);
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
