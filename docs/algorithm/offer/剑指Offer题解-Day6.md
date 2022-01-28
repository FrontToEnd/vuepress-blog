# 剑指 Offer 题解 - Day6

## **剑指 Offer 53 - I. 在排序数组中查找数字 I**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5874p1/)

统计一个数字在排序数组中出现的次数。

示例 1：

```jsx
输入: (nums = [5, 7, 7, 8, 8, 10]), (target = 8);
输出: 2;
```

示例 2：

```jsx
输入: (nums = [5, 7, 7, 8, 8, 10]), (target = 6);
输出: 0;
```

提示：

- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- nums  是一个非递减数组
- -10^9 <= target <= 10^9

思路：

### 暴力破解

首先考虑通过遍历数组进行查找重复次数。该方法没有合理利用有序数组的前提条件，适合无序数组的元素统计。

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let i = 0;
  let j = 0;
  while (i < nums.length) {
    if (nums[i] === target) j++;
    i++;
  }
  return j;
};
```

- 空间复杂度：O(1)。
- 时间复杂度：O(n)。

### 相邻有序

首先题目描述中指出，数组是非递减数组，因此重复元素肯定是相邻的。遇到有序数组，可以考虑使用二分法解决。

平常使用二分法用来判断某个元素是否存在于排序数组中，但是无法有效的获取重复的个数。因此需要在二分法的基础上进一步确定左右边界。

我们规定：最终的左区间和右区间是紧邻重复的目标元素，也就是目标元素位于`(left, right)`开区间内。因此最后返回`right - left - 1`。

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let i = 0;
  let j = nums.length - 1;
  // 确定右边界
  while (i <= j) {
    let middle = Math.floor(i + (j - i) / 2);
    if (nums[middle] <= target) {
      i = middle + 1;
    } else {
      j = middle - 1;
    }
  }
  let right = i;
  i = 0;
  // 如果j所在位置不是目标值，则意味着目标值不存在，直接返回0
  if (j >= 0 && nums[j] !== target) return 0;
  // 确定左边界
  while (i <= j) {
    let middle = Math.floor(i + (j - i) / 2);
    if (nums[middle] < target) {
      i = middle + 1;
    } else {
      j = middle - 1;
    }
  }
  let left = j;
  return right - left - 1;
};
```

- **时间复杂度  *O*(log*N*)**。
- **空间复杂度  O(1)**。

分析：

首先通过二分法确定出右边界，由于最后一次满足条件会执行 `i = middle + 1` ，因此`i` 就是右边界。

此处有一个优化条件，那就是第一次二分之后，`j` 所在位置如果不是目标值，则意味着目标值不存在。那是因为最后一次会执行`j = middle - 1` 。如果目标值存在，则`j`刚好是最后一个目标值所在位置。

第二次二分用来确定左边界。注意此处的判断条件，当中间值大于等于目标值时，都会执行`j = middle - 1` 。因此最后一次执行的时候，就会执行此语句。所以`j` 就是左边界。

最后通过相减得到重复的次数。

### 总结

该题属于二分法的进阶版，通过两次二分法分别来确定左右边界。最后需要注意边界的处理。
