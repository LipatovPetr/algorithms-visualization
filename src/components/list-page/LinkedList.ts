export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteHead: () => T | undefined;
  deleteTail: () => T | undefined;
  deleteByIndex: (index: number) => T | undefined;
  addByIndex: (element: T, index: number) => void;
  getSize: () => number;
  toArray: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(array: Array<T> = []) {
    this.head = null;
    this.size = 0;

    for (const item of array) {
      this.append(item);
    }
  }

  prepend(value: T) {
    const node = new Node(value, this.head);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  append(value: T) {
    const node = new Node(value);
    if (this.head) {
      let curr = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    } else {
      this.head = node;
    }

    this.size++;
  }

  deleteHead(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    const deletedValue = this.head.value;
    this.head = this.head.next;
    this.size--;

    return deletedValue;
  }

  deleteTail() {
    if (!this.head) {
      return undefined;
    } else if (!this.head.next) {
      const deletedValue = this.head.value;
      this.head = null;
      this.size--;
      return deletedValue;
    } else {
      let curr = this.head;
      while (curr.next?.next) {
        curr = curr.next;
      }
      const deletedValue = curr.next!.value;
      curr.next = null;
      this.size--;

      return deletedValue;
    }
  }

  addByIndex(value: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error(`Неверный индекс. Допустимый диапазон [0, ${this.size}]`);
    }

    if (index === 0) {
      // If the index is 0, add the element to the beginning of the list
      this.prepend(value);
    } else if (index === this.size) {
      // If the index is equal to the size of the list, add the element to the end of the list
      this.append(value);
    } else {
      // Start from the head of the list
      let curr = this.head;
      let currIndex = 0;

      // Move to the node preceding the specified index
      while (curr && currIndex !== index - 1) {
        curr = curr.next;
        currIndex++;
      }

      if (curr) {
        // If curr is not null, insert the new node between curr and curr.next
        const newNode = new Node(value, curr.next);
        curr.next = newNode;
        this.size++;
      }
    }
  }

  deleteByIndex(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      throw new Error(
        `Неверный индекс. Допустимый диапазон [0, ${this.size - 1}]`
      );
    }

    let deletedValue: T | undefined;

    if (index === 0) {
      // If the index is 0, delete the head of the list
      deletedValue = this.deleteHead();
    } else if (index === this.size - 1) {
      // If the index is equal to the size of the list - 1, delete the tail of the list
      deletedValue = this.deleteTail();
    } else {
      // Start from the head of the list
      let curr = this.head;
      let currIndex = 0;

      // Move to the node preceding the specified index
      while (curr && currIndex !== index - 1) {
        curr = curr.next;
        currIndex++;
      }

      if (curr && curr.next) {
        // // If curr and curr.next are not null, we remove the curr.next node and return its value.
        const deletedNode = curr.next;
        curr.next = curr.next.next;
        this.size--;
        deletedValue = deletedNode.value;
      }
    }

    return deletedValue;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const result: T[] = [];
    let curr = this.head;

    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }

    return result;
  }
}
