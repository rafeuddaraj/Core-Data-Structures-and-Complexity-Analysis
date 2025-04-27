class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insertEnd(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return;
  }
}

const linkList = new LinkList();

linkList.insertEnd(10);
linkList.insertEnd(20);
linkList.insertEnd(30);
console.log(JSON.stringify(linkList));
