import { HEAD, TAIL } from "../../constants/element-captions";

export function isHead(queueLength: number, head: number, index: number) {
  return queueLength && index === head ? HEAD : "";
}

export function isTail(queueLength: number, tail: number, index: number) {
  return queueLength && index === tail - 1 ? TAIL : "";
}
