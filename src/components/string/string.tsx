import React from "react";
import styles from "./string.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useFormInputs } from "../hooks/useForm";

export const StringComponent: React.FC = () => {
  const { handleChange, values } = useFormInputs();

  return (
    <SolutionLayout title="Строка">
      <div className={styles.inputContainer}>
        <Input
          name="string"
          value={values.name}
          onChange={handleChange}
          maxLength={11}
        />
        <Button extraClass={styles.stringButton} text="Развернуть" />
      </div>
    </SolutionLayout>
  );
};
