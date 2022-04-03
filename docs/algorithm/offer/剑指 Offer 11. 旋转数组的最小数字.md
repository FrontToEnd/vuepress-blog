# 剑指 Offer 题解 - Day9

## **剑指 Offer 11. 旋转数组的最小数字**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/50xofm/)

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 重复 元素值的数组 numbers，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。

**示例 1：**

```
输入：[3,4,5,1,2]
输出：1
```

**示例 2：**

```
输入：[2,2,2,0,1]
输出：0
```

思路：

首先想到的是暴力破解。如果不考虑旋转前的数组是升序数组，可以通过遍历的方式找到数组的最小值，亦可以排序后取数组的第一项。

### 排序法

此方法没有合理利用题目中数组的特性，因此面试中不要使用该方法进行题解。

```jsx
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  return numbers.sort((a, b) => a - b)[0]; // 排序后取第一位便是最小值
};
```

### 遍历法

首先声明一个最大值`flag`，通过数组的遍历依次与`flag`进行对比，较小值赋值给`flag` 。遍历结束后返回`flag`，则是最小值。

```jsx
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let flag = +Infinity; // 初始化最大值，方便进行比较
  let i = 0;
  while (i < numbers.length) {
    let current = numbers[i]; // 缓存当前值
    flag = current >= flag ? flag : current; // 较小值赋值给flag
    i++; // 索引递增
  }
  return flag; // 返回最小值
};
```

- **时间复杂度  *O*(n)**。
- **空间复杂度  *O*(1)**。

分析：

该方法和上述的排序后取第一项适合无序的数组，可以在`O(n)` 的时间复杂度内获取最小值。但本题有先决条件，因此还有更优解。

### 二分法

遇到有序的数组，就应该想到二分法。二分法可以将线性时间缩短到对数时间。

具体来说，此题的二分法需要考虑三种情况：

- 首先声明`i,j`分别指向数组的两端；
- 得到中点`m` ，由于`m`是向下取整，因此`i ≤ m < j` ；
- 当`nums[m] < nums[j]`时，旋转点位于`[i,m]` 区间内，因此执行`j = m`；
- 当`nums[m] > nums[j]`时，旋转点位于`[m + 1, j]` 区间内，因此执行`i = m + 1`；
- 当`nums[m] === nums[j]` 时，无法判断旋转点的位置，因此执行执`j = j - 1`缩小判断范围。

上述情况有两个疑问需要解释，包括为什么相等时无法判断旋转点的位置，以及为什么是中点与`j`的比较，而不是与`i`的比较。

对于第一个问题，可以举例说明：

`i = 0, j = 4, m = 2`。而对于`[1,0,1,1,1]`和`[1,1,1,0,1]`两个数组都满足相等的条件，但是一个旋转点在左侧，一个旋转点在右侧，因此无法判断出位置，这里需要缩短范围`j = j - 1`。

对于第二个问题，不使用`nums[i]`和`nums[m]` 进行对比，是因为当`nums[i] < nums[m]`时，无法判断`m`的位置。

```jsx
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let i = 0; // 初始化数组两端的指针
  let j = numbers.length - 1;
  while (i < j) {
    let m = Math.floor(i + (j - i) / 2); // 向下取整，并防止大数溢出
    if (numbers[m] > numbers[j]) i = m + 1;
    // 分别对应上面分析的三种情况
    else if (numbers[m] < numbers[j]) j = m;
    else j--;
  }
  return numbers[i]; // 返回索引i或者j都可以
};
```

- 时间复杂度 ：O(logN)。
- 空间复杂度 ：O(1)。

### 总结

本题优先使用二分法进行题解，难点在于如何判断旋转点的位置，以此来收缩范围。同时要清楚上述提出的两个问题的解释，这样才可以明白为什么这样判断可以得到最终的结果。
