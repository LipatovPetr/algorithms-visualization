import { linkedlistModelNode } from "../../components/list-page/list-page";

export function isWithinListSize(
  index: number,
  listArray: Array<linkedlistModelNode>
) {
  return 0 <= index && index < listArray.length;
}
