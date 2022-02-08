# **剑指Offer题解 - Day19**

## **剑指 Offer 42. 连续子数组的最大和**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/59gq9c/)

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

**示例1:**

```
输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**提示：**

- `1 <= arr.length <= 10^5`
- `100 <= arr[i] <= 100`

思路：

第一时间想到使用暴力法求解。此时需要双层循环进行求解，与题目要求时间复杂度为`O(n)` 不符，放弃。

本题的正确思路是使用动态规划进行求解。首先，需要找出动态规划方程：

- 设动态规划列表 `dp`，`dp[i]` 代表以元素 `nums[i]`为结尾的连续子数组最大和。
- 此时分为两种情况，如果`dp[i - 1] ≤ 0` ，那么前面的元素带来的就是负收益，还不如`nums[i]` 本身；如果`dp[i - 1] > 0` ，那么可以得出下面公式。
- `dp[i] = dp[i - 1] + nums[i]` 。
- 当`dp[0]`时，数组的第一项就是子数组的最大值，因此：`dp[0] = nums[0]`。

通过上述的分析，可以得出以下代码：

### 动态规划

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let val = nums[0]; // 初始化动态记录的最大值
    let result = nums[0]; // 初始化动态规划方程的第一项
    for (let i = 1; i < nums.length; i++) {
        val = nums[i] + Math.max(val, 0)
        result = Math.max(result, val);
    }
    return result;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

上述解法可以通过提交，但是效率不是很好，因此可以再进一步的优化。这里是维护了额外的变量，用来保存nums[i]及以前的连续数组最大值。可以优化为将`nums[i]`本身存储为最大值，省去了维护的变量。

### 动态规划优化

```jsx
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let result = nums[0]; // dp[0]时数组第一项就是最大值
    for (let i = 1; i < nums.length; i++) {
        nums[i] = nums[i] + Math.max(nums[i - 1], 0)
        result = Math.max(result, nums[i]);
    }
    return result;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(1)**。

分析：

动态的将数组当前项重置为当前项的值加上不为负数的前面的值，可以确保当前项就是最大值。

最后返回 `dp`列表中的最大值，代表全局最大值。

同时，由于省去`dp`列表使用的额外空间，因此空间复杂度从 `O(N)`降至 `O(1)` 。

### 总结

本题通过在数组内部存储最大值，可以将空间复杂度降低至`O(1)` 。

可以归纳出动态规划的精髓：要想全局最优，首先找到局部最优解。然后通过动态规划的方程逐步求解。