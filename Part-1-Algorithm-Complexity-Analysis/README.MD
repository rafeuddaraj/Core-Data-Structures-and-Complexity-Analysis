## Part 1: Algorithm Complexity Analysis

### 1. Insert at the beginning of a dynamic array

**Input-Output Mapping:**

1. Input: Dynamic array `arr = [1, 2, 3]`, element `x = 0`
2. Output: `[0, 1, 2, 3]`

**Step-by-Step Cost Breakdown:**

- Shift all elements to the right → O(n)
- Insert at index 0 → O(1)

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`  
**Optimization:** Use a linked list for O(1) insertion at the beginning (Head).

---

### 2. Insert at the end of a linked list

**Input-Output Mapping:**

- Input: Linked List `1 → 2 → 3`, insert at end `4`
- Output: `1 → 2 → 3 → 4`

**Step-by-Step Cost Breakdown:**

- tail → O(1) cause i use tail variable or ref.

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(1)`  
**Optimization:** .....

---

### 3. Search for an element in a hash set

**Input-Output Mapping:**

- Input: `{1, 5, 8}`, search `5`
- Output: `True`

**Step-by-Step Cost Breakdown:**

- Hash and check → O(1)

**Time Complexity:** `O(1)`  
**Space Complexity:** `O(1)`  
**Optimization:** Use Advance hash function to avoid collisions

---

### 4. Rehash a hash table after crossing load factor

**Input-Output Mapping:**

- Input: Complete Hash Table Input.
- Output: Complete and New Hash Table Merge.

**Step-by-Step Cost Breakdown:**

- Generate New Hash Table → O(n)
- Re assign Hash Table All Data → O(n)

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`  
**Optimization:** --

---

### 5. Delete a node from a singly linked list by value

**Input-Output Mapping:**

- Input: `1 → 3 → 5 → 7`, delete `5`
- Output: `1 → 3 → 7`

**Step-by-Step Cost Breakdown:**

- Iterate Current data equal value → O(n)
- Remove Linking and Add Linking → O(1)

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(1)`  
**Optimization:** --

---

### 6. Check if an array contains all unique values

**Input-Output Mapping:**

- Input: `[1, 2, 3, 4]`
- Output: `True`

**Step-by-Step Cost Breakdown:**

- Use Hash Table or Hash Set for tracking → O(n)

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`  
**Optimization:** ---

---

### 7. Count common elements in two hash sets

**Input-Output Mapping:**

- Input: `{1, 2, 3}`, `{2, 3, 4}`
- Output: `2`

**Step-by-Step Cost Breakdown:**

- Iterate smaller set → O(n, m)

**Time Complexity:** `O(n, m)`  
**Space Complexity:** `O(1)`  
**Optimization:** ---

---

### 8. Convert an array into a linked list

**Input-Output Mapping:**

- Input: `[1, 2, 3]`
- Output: `1 → 2 → 3`

**Step-by-Step Cost Breakdown:**

- Create node and connect → O(n)

**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

---

### 9. Clone a hash table with chaining

**Input-Output Mapping:**

- Input: Hash table with chains
- Output: Deep copy

**Step-by-Step Cost Breakdown:**

- Copy buckets + nodes → O(n)

**Time Complexity:** `O(n + m)`  
**Space Complexity:** `O(n + m)`  
**Optimization:** ---

---

### 10. Compare array vs. hash set lookup performance
---
#### Array

| Operation | Time | Space |
|-----------|------|-------|
| Get       | If know index → O(1), otherwise O(n) | O(1) |
| Insert    | If inserting at last index → O(1), otherwise O(n) | O(1) |
| Delete    | If deleting last index → O(1), otherwise O(n) | O(1) |

---

#### Hash Set

| Operation | Time | Space |
|-----------|------|-------|
| Get       | O(1) | O(1) |
| Insert    | O(1) | O(1) |
| Delete    | O(1) | O(1) |
