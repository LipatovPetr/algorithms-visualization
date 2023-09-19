interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getStack: () => T[];
  getSize: () => number;
  clear: () => void;
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length === 0) {
      throw new Error("Stack is empty. Cannot pop.");
    }
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length === 0) {
      return null; // Stack is empty
    }
    return this.container[this.container.length - 1];
  };

  getStack = (): T[] => {
    return this.container;
  };

  getSize = (): number => {
    return this.container.length;
  };

  clear = () => {
    this.container = [];
  };
}

export const stack = new Stack<string>();
