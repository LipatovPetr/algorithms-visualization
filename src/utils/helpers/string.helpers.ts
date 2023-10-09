import { Dispatch, SetStateAction } from "react";
import { delay } from "..";
import { stringMappedToCharsWithState } from "../../components/string/types";
import { DELAY_IN_MS } from "../../constants/delays";

export async function animateThroughState(
  sequence: stringMappedToCharsWithState[],
  stateSetter: Dispatch<SetStateAction<stringMappedToCharsWithState>>
) {
  for (const step of sequence) {
    stateSetter([...step]);
    await delay(DELAY_IN_MS);
  }
}
