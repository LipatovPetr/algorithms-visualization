import { ElementStates } from "../../types/element-states";

export type linkedlistModelNode = {
  value: string;
  state: ElementStates;
  incomingValue: null | string;
};

export type loadingStates = {
  additionToHead: boolean;
  additionToTail: boolean;
  additionByIndex: boolean;
  deletionFromHead: boolean;
  deletionFromTail: boolean;
  deletionByIndex: boolean;
};
