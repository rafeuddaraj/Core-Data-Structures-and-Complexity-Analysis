class CustomArray {
  #size;
  #array;
  constructor(size = 10) {
    this.#size = size;
    this.length = 0;
    this.#array = new Array(size);
  }
  insertAtBeginning(value) {
    if (this.length === this.#size) {
      throw Error("Index Range Error");
    }
    if (this.length === 0) {
      this.#array[this.length] = value; // Time and Space O (1) if index is first.
      this.length++;
      return;
    }
    for (let i = this.length - 1; i >= 0; i--) {
      this.#array[i + 1] = this.#array[i];
    }
    this.#array[0] = value;
    this.length++;
    return;
  }
  get array() {
    let result = [];
    for (let i = 0; this.length > i; i++) {
      result.push(this.#array[i]);
    }
    return result;
  }
}

const customArray = new CustomArray();
customArray.insertAtBeginning(2);
customArray.insertAtBeginning(3);
customArray.insertAtBeginning(4);
customArray.insertAtBeginning(5);
customArray.insertAtBeginning(1);

console.log(customArray.array);
