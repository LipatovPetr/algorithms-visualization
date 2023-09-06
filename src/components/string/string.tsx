import React, { FormEvent, useState, useEffect } from "react";
import styles from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormInputs } from "../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

type charObj = {
  character: string;
  state: ElementStates;
};

type splittedString = Array<charObj>;

function mapStringToArray(str: string) {
  return str.split("").map(
    (char): charObj => ({
      character: char,
      state: ElementStates.Default,
    })
  );
}

export const StringComponent: React.FC = () => {
  const [mappedString, setMappedString] = useState<splittedString>([]);

  const { handleChange, values } = useFormInputs();

  // async function changeStateWithDelay(
  //   len: number,
  //   i: number,
  //   state: ElementStates,
  //   delay: number
  // ) {
  //   if (i !== undefined && i >= 0 && i < len) {
  //     setSplittedString((prevSplittedString) => {
  //       const updatedChar = [...prevSplittedString];
  //       updatedChar[i].state = state;
  //       updatedChar[len - 1 - i].state = state;
  //       return updatedChar;
  //     });
  //   }
  // }

  const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  async function reverseString() {
    let transformedString = mapStringToArray(values.string);
    const len = transformedString.length;

    await delay(DELAY_IN_MS);

    for (let i = 0; i < len / 2; i++) {
      // highlight changing elements

      transformedString[i].state = ElementStates.Changing;
      transformedString[len - 1 - i].state = ElementStates.Changing;

      setMappedString([...transformedString]);
      await delay(DELAY_IN_MS);

      // swap changing elements

      const temp = transformedString[i];
      transformedString[i] = transformedString[len - 1 - i];
      transformedString[len - 1 - i] = temp;

      setMappedString([...transformedString]);
      await delay(DELAY_IN_MS);

      // highlight changed elements

      transformedString[i].state = ElementStates.Modified;
      transformedString[len - 1 - i].state = ElementStates.Modified;

      setMappedString([...transformedString]);
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
          // onClick={() => {
          //   console.log(processedString);
          // }}
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
