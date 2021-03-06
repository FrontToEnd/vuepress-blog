# **剑指Offer题解 - Day28**

## **剑指 Offer 57. 和为 s 的两个数字**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5832fi/)

输入一个递增排序的数组和一个数字`s`，在数组中查找两个数，使得它们的和正好是`s`。如果有多对数字的和等于`s`，则输出任意一对即可。

示例 1：

```jsx
输入：nums = [2,7,11,15], target = 9
输出：[2,7] 或者 [7,2]
```

示例 2：

```jsx
输入：nums = [10,26,30,31,47,60], target = 40
输出：[10,30] 或者 [30,10]
```

**限制：**

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

思路：

如果采用两数之和的解题思路，可以使用哈希表存储遍历过的值。遍历途中使得目标值减去当前值，如果哈希表中存在该值，则意味找到了两数，返回相应的值即可。

这样做的话，时间复杂度和空间复杂度均为`O(n)` 。但是没有充分利用题目的条件：有序数组。

本题采取双指针的解法，可以将空间复杂度降低至`O(1)` 。

### 双指针

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let left = 0; // 初始化左指针
    let right = nums.length - 1; // 初始化右指针
    while(left < right) { // 左右指针相遇便终止循环
        let sum = nums[left] + nums[right]; // 计算当前的两数之和
        if (sum < target) left++; // 如果总和小于目标值，那么左指针右移
        else if (sum > target) right--; // 如果总和大于目标值，那么右指针左移
        else return [nums[left], nums[right]]; // 相等则返回两数组成的数组
    }
    return []; // 如果没有则返回空数组
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(1)**。

分析：

由于数组是已排序的增序数组，因此可以通过声明指针分别指向数组的头部和尾部，并不断收缩来进行求解。

每次循环时，计算当前的两数之和。如果总和小于目标值，需要右移左指针增加总和；如果总和大于目标值，需要左移右指针减少总和；如果总和等于目标值，返回两数组成的数组。

如果循环结束也没有找到，则返回空数组。

那么问题来了，这样做会遗漏某些组合吗？其实不会。具体的证明过程可以参考文章开头给出的链接，此处不再进行证明。

### 总结

本题解利用已知条件有序数组，通过双指针的方式进行求解。如果数组不是有序，那么就无法直接使用双指针的方法。要么开辟额外的空间来存储，要么将数组排序后再使用双指针的方式求解。
