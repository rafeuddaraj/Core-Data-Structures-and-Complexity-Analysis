class Node {
  constructor(value, timestamp = Date.now()) {
    // default timestamp is current time if user not provide
    this.value = value;
    this.timestamp = timestamp / 1000;
    this.next = null;
  }
}

class TimeAwareLinklist {
  #head;
  constructor() {
    this.#head = null;
  }

  insert(value, timestamp) {
    const newNode = new Node(value, timestamp);
    if (!this.#head) {
      this.#head = newNode;
      return;
    }
    newNode.next = this.#head;
    this.#head = newNode;
  }

  retrieveLastNTime(seconds) {
    if (!this.#head) throw new Error("Empty list!");
    const now = Date.now() / 1000;
    const result = [];
    let current = this.#head;

    while (current) {
      if (now - current.timestamp <= seconds) {
        result.push([current.timestamp, current.value]);
      }
      current = current.next;
    }
    return result;
  }
}

const timeAwareLinklist = new TimeAwareLinklist();

setTimeout(() => {
  timeAwareLinklist.insert("Data 1", Date.now());
  console.log("Inserted Data 1");
}, 0);

setTimeout(() => {
  timeAwareLinklist.insert("Data 2", Date.now());
  console.log("Inserted Data 2");
}, 1000);

setTimeout(() => {
  timeAwareLinklist.insert("Data 3", Date.now());
  console.log("Inserted Data 3");
}, 2000);

setTimeout(() => {
  timeAwareLinklist.insert("Data 4", Date.now());
  console.log("Inserted Data 4");
}, 3000);

setTimeout(() => {
  timeAwareLinklist.insert("Old Data", Date.now() - 10000);
  console.log("Inserted Old Data");
}, 3500);

setTimeout(() => {
  console.log("Retrieved Data within last 2 seconds:");
  console.log(timeAwareLinklist.retrieveLastNTime(2));
}, 4500);
