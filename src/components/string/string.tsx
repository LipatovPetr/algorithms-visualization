import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { stringMappedToCharsWithState } from "./types";
import {
  mapStringToArray,
  swapChars,
} from "../../utils/helpers/string.helpers";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../../utils";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormInputs } from "../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [mappedString, setMappedString] =
    useState<stringMappedToCharsWithState>([]);
  const { handleChange, values } = useFormInputs();

  async function reverseString() {
    let processedString = mapStringToArray(values.string);
    const len = processedString.length;

    for (let i = 0; i < len / 2; i++) {
      // highlight changing elements
      processedString[i].state = ElementStates.Changing;
      processedString[len - 1 - i].state = ElementStates.Changing;
      setMappedString([...processedString]);

      await delay(DELAY_IN_MS);

      // swap changing elements
      swapChars(processedString, i, len - 1 - i);
      // setMappedString([...processedString]);

      // highlight successfully changed elements
      processedString[i].state = ElementStates.Modified;
      processedString[len - 1 - i].state = ElementStates.Modified;
      setMappedString([...processedString]);

      await delay(DELAY_IN_MS);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reverseString();
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="string"
          value={values.string || ""}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
        />
        <Button
          type="submit"
          extraClass={styles.submitButton}
          text="Развернуть"
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
