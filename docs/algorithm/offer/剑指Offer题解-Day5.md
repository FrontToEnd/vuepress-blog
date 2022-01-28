# 剑指 Offer 题解 - Day5

## **剑指 Offer 03. 数组中重复的数字**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/59bjss/)

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

```jsx
输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3
```

限制：

- `2 <= n <= 100000`

思路：

首先考虑使用哈希表存储数组中的值。遍历数组的时候判断哈希表中时候存在该值，如果存在直接返回该值，否则存入哈希表。

### 哈希表

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  let map = new Map(); // 新建哈希表用来存储数组中的值
  for (let i = 0; i < nums.length; i++) {
    let value = nums[i]; // 缓存当前值
    if (map.has(value)) return value; // 如果存在于哈希表，则返回当前值
    map.set(value, true); // 否则存储
  }
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

分析：

该解法是用空间换时间的典型处理方案。使用额外的内存维护哈希表，很方便的存取数组的值。该思路也可以用来统计数组中值出现的次数，并进行排序。

### 原地交换

根据题目描述，所有数字都在 0 ～ n-1 的范围内。但是上述题解并没有用到该条件。根据此条件，可以得出一个结论：数组元素的  **索引**  和  **值**  是  **一对多**  的关系。

因此，我们可以：通过遍历数组，同时交换元素。使得元素的**索引**和**值**一一对应。也就是`nums[i] === i` 这种关系。当遇到第一个`nums[nums[i]] === nums[i]` ，我们就找到了重复元素`nums[i]` 。

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  let i = 0; // 初始化索引
  while (i < nums.length) {
    let value = nums[i]; // 缓存当前值，会多次用到
    if (value === i) {
      // 如果当前索引和当前值相等，则意味着一一对应，继续下一次循环
      i++; // 索引右移
      continue;
    }
    if (nums[value] === value) return value; // 如果nums[nums[i]] === nums[i]，则当前值就是重复的值
    nums[i] = nums[value]; // 交换索引i和nums[i]的值，将nums[nums[i]]放至正确的位置
    nums[value] = value;
  }
  return -1; // 如果没有重复元素，则返回-1
};
```

- 空间复杂度：O(1)。
- 时间复杂度：O(n)。

分析：

上述题解的主要思路是将元素的索引和值一一对应，当遇到后面的值等于前面索引的时候，则意味着有重复元素。

### 总结

本题两个题解，分别体现了哈希表的特点和利用题目本身的要求来实现。原地交换不需要额外的空间来存储，该方法更胜一筹。遇到数组等问题，要优先考虑原地交换或者指针来进行解题。
