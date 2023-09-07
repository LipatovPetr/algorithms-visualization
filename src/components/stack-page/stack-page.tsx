import React from "react";
import styles from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.inputsContainer}>
        <div className={styles.innerContainer}>
          <Input />
          <Button text={"Добавить"} />
          <Button text={"Удалить"} />
        </div>
        <Button text={"Очистить"} />
      </div>
    </SolutionLayout>
  );
};
