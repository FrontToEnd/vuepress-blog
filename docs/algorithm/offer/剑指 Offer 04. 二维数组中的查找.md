# 剑指 Offer 题解 - Day8

## **剑指 Offer 04. 二维数组中的查找**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5v76yi/)

在一个 n \* m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

示例:

现有矩阵 matrix 如下：

```jsx
[
	[1,   4,  7, 11, 15],
	[2,   5,  8, 12, 19],
	[3,   6,  9, 16, 22],
	[10, 13, 14, 17, 24],
	[18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。
```

给定  target = 20，返回  false。

**限制：**

`0 <= n <= 1000`

`0 <= m <= 1000`

思路：

首先考虑暴力破解本题。先不使用已知有序的条件，如果从二维数组中判断是否有目标值，双层循环可以解决。

### 暴力法

```jsx
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  let flag = false; // 初始化标志位
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === target) {
        // 如果目标值存在于矩阵中
        flag = true; // 将标志位置为true
        break; // 结束循环
      }
    }
  }
  return flag; // 返回标志位
};
```

- **时间复杂度  *O*(n \* m)**。
- **空间复杂度  *O*(1)**。

分析：

暴力破解是比较低效的一种手段，没有合理利用从左到右，从上到下递增的特点。适合无序或者少量数据的二维数组。当找到目标值，就直接中断循环，并返回为`true`的标志位，否则需要遍历整个数组才会返回`false` 。

### 剪枝法

根据题目描述，我们可以通过对比左下角的值来进行剪枝。我们暂定左下角的值为`flag`。

- `flag < target`，我们可以将`flag`所在列舍去，因为上面的值肯定更小；
- `flag > target`，我们可以将`flag`所在行舍去，因为右面的值肯定更大；
- `flag === target`，则找到目标值，返回`true`。
- 超过边界，意味着没有找到，返回`false`。

左下角的值通过`matrix[i][j]`动态获取到，根据二维数组的特点，左下角的值是外层数组的最后一项，里层数组的第一项，由此可得：

```jsx
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  let i = matrix.length - 1; // 获取左下角的值
  let j = 0;
  while (i >= 0 && j < matrix[0].length) {
    // 循环条件
    if (matrix[i][j] < target) j++;
    // 如果当前值小于目标值，意味着目标值在右侧
    else if (matrix[i][j] > target) i--;
    // 如果当前值大于目标值，意味着目标值在上侧
    else return true; // 如果相等，则存在目标值
  }
  return false; // 循环结束也没找到，则不存在目标值
};
```

- **时间复杂度  *O*(n + m)**。
- **空间复杂度  *O*(1)**。

### 总结

合理利用题目给出的条件，可以每次都剪去一行或者一列，让时间复杂度由`O(n * m)` 减少为`O(n + m)` 。题目中的二维数组近似于二叉搜索树，左下角的值越小，右上角的值越大。然后通过对比左下角或者右上角的值来剪枝操作。
