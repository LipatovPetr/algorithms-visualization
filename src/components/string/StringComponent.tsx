import { FormEvent, useState } from "react";
import styles from "./StringComponent.module.css";
import { stringMappedToCharsWithState } from "./types";
import { createReverseStringSeq } from "./algorithm";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormInputs } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { MAX_LENGTH } from "./constants";
import { animateThroughState } from "../../utils/helpers/string.helpers";

export const StringComponent = () => {
  const [isLoding, setLoadingState] = useState(false);
  const [mappedString, setMappedString] =
    useState<stringMappedToCharsWithState>([]);
  const { handleChange, values } = useFormInputs();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingState(true);
    const reverseStringSequence = createReverseStringSeq(values.string);
    await animateThroughState(reverseStringSequence, setMappedString);
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
