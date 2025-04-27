class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
  }
  insert(key, value) {
    const newNode = new Node(key, value);
    const existing = this.#findNode(key);
    if (existing) {
      existing.data = value;
      return;
    }
    if (!this.head) {
      this.head = newNode;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
    return;
  }
  #findNode(key) {
    if (!this.head) return null;
    if (this.head.key === key) return this.head;
    let current = this.head;
    while (current) {
      if (current.key === key) return current;
      current = current.next;
    }
    return null;
  }
  find(key) {
    const node = this.#findNode(key);
    return node ? node?.value : null;
  }
  *entries() {
    let current = this.head;
    while (current) {
      yield [current.key, current.data];
      current = current.next;
    }
  }
}

class HashTable {
  #table;
  #size;
  constructor(size = 53) {
    this.#size = size;
    this.#table = new Array(this.size);
    this.count = 0;
  }
  set(key, value) {
    if (this.count / this.#size >= 0.75) this.#resize(this.#size * 2);

    const index = this.#hash(key);

    if (!this.#table[index]) {
      this.#table[index] = new LinkList();
    }
    const bucket = this.#table[index];
    const existing = bucket.find(key);
    if (!existing) {
      this.count++;
    }
    bucket.insert(key, value);
  }
  #resize(size) {
    const oldData = Array.from(this.#table);
    this.#size = size;
    this.#table = new Array(this.#size);
    for (let bucket of oldData) {
      if (bucket) {
        this.#table.push(bucket);
      }
    }
  }
  #hash(str = "") {
    let hash = 5381;
    for (let char of str) {
      hash = (hash * 33) ^ char.charCodeAt(0);
    }
    return Math.abs(hash) % this.#size;
  }
  values() {
    let result = [];
    for (let bucket of this.#table) {
      if (bucket) {
        for (let [_, value] of bucket.entries()) {
          result.push(value);
        }
      }
    }
    return result;
  }
  search(key) {
    const index = this.#hash(key);
    return this.#table[index] || null;
  }
  getSize() {
    return this.#size;
  }
}

const hashTable = new HashTable(1);
hashTable.set("age", 20);
hashTable.set("name", "Rafe Uddaraj");
console.log(hashTable.values());

console.log(hashTable.getSize());
