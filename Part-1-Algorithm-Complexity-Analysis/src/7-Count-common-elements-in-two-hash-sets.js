const setA = new Set([1, 2, 3, 4, 9]);
const setB = new Set([3, 4, 5, 1, 9, 4]);

function countCommonElements(setA = new Set(), setB = new Set()) {
  let count = 0;
  let large, smaller;
  if (setA.size > setB) {
    large = setA;
    smaller = setB;
  } else {
    large = setB;
    smaller = setA;
  }
  for (let element of smaller) {
    if (large.has(element)) {
      count++;
    }
  }
  return count;
}

console.log(countCommonElements(setA, setB));
