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
      existing.value = value;
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
      if (current.key === key) return this.head;
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
  #keys;
  constructor(size = 53) {
    this.#size = size;
    this.#table = new Array(this.size);
    this.#keys = new Set();
    this.count = 0;
  }
  set(key, value) {
    const index = this.#hash(key);
    if (!this.#table[index]) {
      this.#table[index] = new LinkList();
    }
    const bucket = this.#table[index];
    const existing = bucket.find(key);
    if (!existing) {
      this.count++;
    }
    this.#keys.add(key);
    bucket.insert(key, value);
  }
  get(key) {
    const index = this.#hash(key);
    return this.#table[index] || null;
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
  keys() {
    let keys = Array.from(this.#keys);
    return keys;
  }
}

class HashSet {
  constructor() {
    this.data = new HashTable();
    this.count = 0;
  }
  set(value) {
    const existing = this.data.get(String(value));
    if (!existing) {
      this.count++;
    }
    this.data.set(String(value), true);
  }
  get(value) {
    return this.data.get(String(value)) || null;
  }
  values() {
    let result = [];
    for (let value of this.data.keys()) {
      if (value) {
        result.push(value);
      }
    }
    return result;
  }
}

const hashSet = new HashSet();
hashSet.set(10);
hashSet.set(20);
hashSet.set(30);
console.log(hashSet.get("10"));
