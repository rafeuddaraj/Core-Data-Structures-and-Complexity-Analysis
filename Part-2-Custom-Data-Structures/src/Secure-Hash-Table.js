class Node {
  constructor(key, value) {
    this.value = value;
    this.key = key;
    this.ttl = null;
    this.createdAt = new Date();
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
  }
  insert(key, value, ttl = null) {
    const newNode = new Node(key, value);
    newNode.ttl = ttl;
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let existing = this.#findNode(key);
    if (existing) {
      existing.value = value;
      existing.ttl = ttl;
      return;
    }
    newNode.next = this.head;
    this.head = newNode;
    return;
  }
  remove(key) {
    if (!this.head) throw Error("Empty list!");
    if (this.head.key === key) {
      this.head = this.head.next;
      return true;
    }
    let current = this.head.next;
    while (current) {
      if (current.key === key) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }
  #findNode(key) {
    if (!this.head) return null;
    if (this.head.key === key) return this.head;
    let current = this.head.next;
    while (current) {
      if (current.key === key) return current;
      current = current.next;
    }
    return null;
  }
  find(key) {
    const node = this.#findNode(key);
    return node ? [node.key, node.value, node.createdAt, node.ttl] : null;
  }
  *#entries() {
    let current = this.head;
    while (current) {
      yield [current.key, current.value, current.createdAt, current.ttl];
      current = current.next;
    }
  }
  [Symbol.iterator]() {
    return this.#entries();
  }
}

class SecureHashTable {
  #table;
  #size;
  #count;
  #keys;
  constructor(size = 53) {
    this.#size = size;
    this.#table = new Array(size);
    this.#keys = new Set();
    this.#count = 0;
  }
  #hash(key = "") {
    key = String(key);
    let hash = 5381;
    for (let char of key) {
      hash = (hash * 33) ^ char.charCodeAt(0);
    }
    return Math.abs(hash) % this.#size;
  }
  set(key, value, ttl) {
    if (this.#count / this.#size > 0.75) this.#resize(this.#size * 2);

    const index = this.#hash(key);

    if (!this.#table[index]) {
      this.#table[index] = new LinkList();
    }
    const bucket = this.#table[index];
    const existing = bucket.find(key);
    if (!existing) {
      this.#count++;
    }
    bucket.insert(key, value, ttl);
    this.#keys.add(key);
  }

  get(key) {
    const index = this.#hash(key);
    const bucket = this.#table[index];
    return bucket?.find(key) || null;
  }

  remove(key) {
    const index = this.#hash(key);
    const bucket = this.#table[index];
    return bucket.remove(key);
  }
  #resize(newSize) {
    const oldTable = this.#table;
    this.#size = newSize;
    this.#table = new Array(this.#size);
    console.log(this.#table);

    // for (let bucket of oldTable) {
    //   console.log(bucket);

    //   if (bucket) {
    //     for (let [key, value, ttl] of bucket) {
    //       console.log([key, value, ttl]);

    //       this.set(key, value, ttl);
    //     }
    //   }
    // }
  }
  getTable() {
    return this.#table;
  }
  getSize() {
    return this.#size;
  }
}

const secureHashTable = new SecureHashTable(1);

secureHashTable.set("name", "Rafe Uddaraj");
secureHashTable.set("age", 21);
// secureHashTable.set("country", "Bangladesh");
// console.log(secureHashTable.getTable());
console.log(secureHashTable.getTable());
