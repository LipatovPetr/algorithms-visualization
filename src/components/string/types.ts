import { ElementStates } from "../../types/element-states";

export type charObj = {
  character: string;
  state: ElementStates;
};

export type stringMappedToCharsWithState = Array<charObj>;
