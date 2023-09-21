import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { MAX_INPUT_LENGTH } from "./constants";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.upperRow}>
          <div>
            <Input extraClass={styles.input} placeholder="Введите значение" />
            <p
              className={styles.caption}
            >{`Максимум — ${MAX_INPUT_LENGTH} символов`}</p>
          </div>
          <Button text="Добавить в head" linkedList="small" />
          <Button text="Добавить в tail" linkedList="small" />
          <Button text="Удалить из head" linkedList="small" />
          <Button text="Удалить из tail" linkedList="small" />
        </div>
        <div className={styles.bottomRow}>
          <Input extraClass={styles.input} placeholder="Введите индекс" />
          <Button text="Добавить в head" linkedList="big" />
          <Button text="Добавить в tail" linkedList="big" />
        </div>
      </form>
    </SolutionLayout>
  );
};
