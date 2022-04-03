# 剑指 Offer 题解 - Day7

## **剑指 Offer 53 - II. 0 ~ n-1 中缺失的数字**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/58iqo5/)

一个长度为 n-1 的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围 0 ～ n-1 之内。在范围 0 ～ n-1 内的 n 个数字中有且只有一个数字不在该数组中，请找出这个数字。

示例 1：

```
输入: [0,1,3]
输出: 2
```

示例 2：

```
输入: [0,1,2,3,4,5,6,7,9]
输出: 8
```

**限制：**

`1 <= 数组长度 <= 10000`

思路：

首先考虑暴利破解。根据题目描述，该数组是数值不重复的递增数组。我们利用数字范围来解题。如果数字存在于数组中，那么当前值就是数组的当前索引，如果不是，那么该值就是缺失的值，返回即可。

### 循环

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (i !== nums[i]) break; // 当索引值和数组值不相等时，则中断循环
    i++;
  }
  return i; // 返回当前的索引值
};
```

### 二分法

该题也可以使用二分法解决。如果中间的值等于索引值，那就意味着左侧数字肯定是不缺失的。那么此时缺失值就在右侧。如果说中间值不等于(其实就是小于，因为数字不重复，不可能大于)索引值，那就意味着左侧某个数字是缺失的，如此便可确认最终缺失的值。

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let left = 0; // 确定左右边界
  let right = nums.length - 1;
  while (left <= right) {
    let middle = Math.floor(left + (right - left) / 2);
    if (nums[middle] === middle) {
      left = middle + 1; // 左侧有序，值在右侧
    } else {
      right = middle - 1; // 左侧数据缺失，值在左侧
    }
  }
  return left; // 返回缺失值的索引
};
```

- **时间复杂度 _O_(log*N*)**。
- **空间复杂度 _O_(1)**。

分析：当循环执行到最后一次时，此时 `left、middle、right` 三个值相等，但是当前索引值不是数组的值，因此会执行`right = middle - 1` 。然后右边界小于左边界，循环终止。最终左边界所在的值就是当前索引与数组的值不相等的位置，返回**左边界**即可，因为左边界的索引值就是缺失的数字。

### 巧妙法

还有一种办法是通过位运算进行处理。我们知道异或具有交换律，因此可以写出如下题解：

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let xor = 0;
  for (let i = 0; i < nums.length; i++) {
    xor = xor ^ nums[i] ^ (i + 1);
  }
  return xor;
};
```

- **时间复杂度 _O_(n)**。
- **空间复杂度 _O_(1)**。

分析：

当数据开始缺失以后，`nums[i]`和`i + 1` 是相等的。而此时的`xor`就是本该出现但是没有出现的值。也就是缺失的值。以后每次异或都是`xor`和两个相等的值进行异或。根据异或的特点，`xor`不变。最终返回的值，也就是缺失的值。

### 总结

本题在面试中应该采取二分法进行解题。异或的方法不容易想到，作为参考即可。
