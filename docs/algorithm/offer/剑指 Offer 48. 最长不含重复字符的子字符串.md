# **剑指Offer题解 - Day22**

## **剑指 Offer 48. 最长不含重复字符的子字符串**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5dgr0c/)

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

**示例 1:**

```jsx
输入:"abcabcbb"
输出:3
解释: 因为无重复字符的最长子串是"abc"，所以其长度为 3。
```

示例 3:

```jsx
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

提示：

- `s.length <= 40000`

思路：

本题如果采用暴力法进行破解的话，首先需要找到字符串中的所有子串，然后判断每个子串内的字符是否重复。上述过程需要的复杂度是`O(n^3)` 。复杂度过高，因此放弃。

本题可以采取动态规划的方式进行求解。首先找出动态规划方程：

- 设定`dp[j]` 代表以字符 `s[j]`为结尾的 “最长不重复子字符串” 的长度。
- `j`为右边界，`i`为距离右边界最近的相同字符，也就是`s[i] === s[j]` 。
- 如果`i < 0` ，意味着s[j]的左侧没有相同的字符，此时：`dp[j] = dp[j - 1] + 1` 。
- 如果`dp[j - 1] < j - i` ，也就意味着`s[i]`不在`dp[j - 1]` 区间内，此时：`dp[j] = dp[j - 1] + 1` 。
- 如果`dp[j - 1] ≥ j - 1`，也就意味着`s[i]`在`dp[ j - 1]` 区间内，此时：`dp[j] = j - i`。

找到了方程，我们还有一个问题需要解决，那就是如何确定`i`？

### 哈希表

```jsx
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let result = 0; // 初始化结果变量
    let temp = 0; // 初始化临时变量
    let length = s.length; // 缓存字符的长度
    let map = new Map(); // 声明哈希表，存储当前字符的索引
    for (let j = 0; j < length; j++) {
        let i = map.get(s.charAt(j)) ?? -1;
        map.set(s.charAt(j), j);
        temp = temp < j - i ? temp + 1 : j - i;
        result = Math.max(result, temp);
    }
    return result;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(1)**。

分析：

通过使用哈希表来存储当前字符的索引。方便当下次遇到相同字符时，获取索引用来计算`j - i`的值。

遍历字符串每个字符，获取当前字符的左侧距离最近的相同字符索引，如果没有则为`-1` 。然后更新当前字符在哈希表内的最新索引。

如果临时变量存储的`dp[j - 1]`的值小于`j - i` ，意味着`s[i]`不在`dp[j - 1]` 内，此时执行`dp[j - 1] + 1` ；否则，意味着`s[i]`在`dp[j - 1]` 内，最长不重复子串的长度为`j - i` 。

每次循环保存最大值，最终返回即可。

复杂度方面，由于需要遍历整个字符串，因此时间复杂度是`O(n)` ，而哈希表最多存储`128`个`ASCII` 码，因此空间复杂度是`O(1)` 。

### 双指针 + 哈希表

```jsx
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let i = -1;
    let result = 0;
    let map = new Map();
    for(let j = 0; j < s.length; j++) {
        const current = s.charAt(j); // 记录当前索引下的字符
        if (map.has(current)) { // 如果字符存在于哈希表中
            i = Math.max(i, map.get(current)) // 更新i为最大的索引
        }
        map.set(current, j); // 将当前字符的索引存储于哈希表中
        result = Math.max(result, j - i); // 存储较大值
    }
    return result;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(1)**。

分析：

通过双指针的方式，动态更新左边界，确保`[i + 1, j]` 没有重复字符且最大。

最终取上一轮的`result`和本轮双指针区间`[i + 1, j]`的最大值，并返回。

### 总结

本题考查动态规划，属于中等难度的题目，分析方程比较难总结，还需要多多练习。

核心点在于通过哈希表保存字符的索引，当下次循环遇到相同字符时，便可以知道上次字符出现的位置。
