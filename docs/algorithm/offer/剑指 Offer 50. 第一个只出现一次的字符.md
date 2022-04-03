# 剑指 Offer 题解 - Day10

## **剑指 Offer 50. 第一个只出现一次的字符**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5viisg/)

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

示例 1:

```jsx
输入：s = "abaccdeff"
输出：'b'
```

示例 2:

```jsx
输入：s = ""
输出：' '
```

限制：

`0 <= s 的长度 <= 50000`

思路：

首先考虑使用字符串的 API 来解题。这里需要找出第一个只出现一次的字符，我们可以通过判断某个字符首次出现的索引和最后出现的索引是否相等，来找出第一个。

### 暴力法

```jsx
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return s[i]; // 找出第一个前后索引相等的值并返回
    }
  }
  return " "; // 如果遍历结束也没有，则返回空格
};
```

- **时间复杂度  *O*(n^2)**。
- **空间复杂度  *O*(1)**。

分析：不建议面试中采取该方法进行题解。而且由于两层循环导致查询效率较慢。因此优先使用哈希表的方法进行处理。

### 哈希表

使用哈希表进行字符出现次数的统计，然后返回首个次数为 1 的数值。或者将出现多次的哈希值置为`false`，返回首个值为`true`的。

```jsx
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  let map = new Map(); // 初始化哈希表
  for (let i = 0; i < s.length; i++) {
    let current = s[i]; // 缓存当前字符
    if (!map.has(current)) {
      // 如果哈希表中不存在当前字符
      map.set(current, true); // 设置哈希值为true，并继续下次循环
      continue;
    }
    map.set(current, false); // 否则意味着字符出现多次，并设置哈希值为false
  }
  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    if (map.get(current)) return current; // 找到第一个哈希值为true的字符
  }
  return " "; // 找不到则返回空格
};
```

- **时间复杂度  *O*(n)**。
- **空间复杂度  *O*(1)**。

分析：

额外使用了哈希表进行字符出现状态的存储。将时间复杂度由平方时间降低为线性时间。根据题目描述，字符串均为小写字母，因此哈希表中最多为 26 个小写字母，空间复杂度为`O(1)`。

### 哈希表优化

当字符串很长很长时，遍历两遍字符串耗时较高，此时可以优化为：第二轮遍历哈希表，因为哈希表最多存在 26 个键值对，小于遍历字符串的次数。根据这个思路，可以写出以下代码：

```jsx
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  let map = new Map(); // 初始化哈希表
  for (let i = 0; i < s.length; i++) {
    // 首次遍历与上述逻辑相同
    let current = s[i];
    if (!map.has(current)) {
      map.set(current, true);
      continue;
    }
    map.set(current, false);
  }
  for (const [key, value] of map.entries()) {
    // 遍历哈希表
    if (value) return key; // 返回首个值为true的键
  }
  return " "; // 找不到则返回空格
};
```

- **时间复杂度  *O*(n)**。
- **空间复杂度  *O*(1)**。

### 总结

本题考查哈希表数据结构。针对题目的要求，可以进行哈希表的优化。由于题目描述中指出字符串只包含小写字母，因此第二次遍历的时候，我们遍历哈希表首次值为`true`的键，则是我们需要找出的字符。
