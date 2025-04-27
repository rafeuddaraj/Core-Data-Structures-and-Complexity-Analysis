# TimeAwareLinklist

An implementation of a **TimeAwareLinklist** where each node stores a timestamp along with its value. This allows retrieval of only those nodes inserted within a given time window.

---

## Classes

### Node
Represents a single element in the linked list.

```js
class Node {
  constructor(value, timestamp = Date.now()) {
    // Default timestamp is the current time if user does not provide one
    this.value = value;
    this.timestamp = timestamp / 1000; // store timestamp in seconds
    this.next = null;
  }
}
```

- **value**: The data stored in the node.
- **timestamp**: The time when the node was created (defaults to current time).
- **next**: A pointer to the next node.

---

### TimeAwareLinklist
Manages the linked list with time-based retrieval functionality.

```js
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
```

- **insert(value, timestamp)**: Inserts a new node at the beginning.
- **retrieveLastNTime(seconds)**: Returns all nodes inserted within the last `seconds` seconds.

---

## Example Usage

```javascript
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
  // Insert an old data item 10 seconds in the past
  timeAwareLinklist.insert("Old Data", Date.now() - 10000);
  console.log("Inserted Old Data");
}, 3500);

setTimeout(() => {
  console.log("Retrieved Data within last 2 seconds:");
  console.log(timeAwareLinklist.retrieveLastNTime(2));
}, 4500);
```

---

## Output

```
Inserted Data 1
Inserted Data 2
Inserted Data 3
Inserted Data 4
Inserted Old Data

Retrieved Data within last 2 seconds:
[
  [timestamp, 'Data 4'],
  [timestamp, 'Data 3']
]
```

> Note: "Old Data" is not retrieved because it was inserted with an old timestamp that falls outside the specified 2-second window.
