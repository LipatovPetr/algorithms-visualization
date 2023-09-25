import { ElementStates } from "../../types/element-states";

export type linkedlistModelNode = {
  value: string;
  state: ElementStates;
  incomingValue: null | string;
};
