# **剑指Offer题解 - Day57**

## 剑指 Offer 31. 栈的压入、弹出序列

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5wh1hj/)

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

示例 1：

```jsx
输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
输出：true
解释：我们可以按以下顺序执行：
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
```

提示：

- `0 <= pushed.length == popped.length <= 1000`
- `0 <= pushed[i], popped[i] < 1000`
- `pushed` 是 `popped` 的排列。

思路：

通过阅读题目描述，可以发现两个关键点：

- `pushed` 是 `popped` 的排列。意味着两者肯定长度相同且元素相同。
- 压入栈的所有数字均不相等。意味着无需考虑重复数字的问题。

### 辅助栈

本题使用辅助栈来解决。根据栈 **后进先出** 的特点，通过使用辅助栈来模拟栈的压入和弹出操作，如果最终辅助栈的结果为空，意味着压栈顺序和出栈顺序可以一一对应。

```jsx
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    let stack = []; // 初始化辅助栈
    let i = 0; // 初始化出栈数组索引
    for(const num of pushed) {
        stack.push(num);
        while(stack.length && stack[stack.length - 1] === popped[i]) {
            stack.pop();
            i++;
        }
    }
    return !stack.length;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

首先通过遍历压栈数组将元素依次放入辅助栈中。每放入一个元素，就判断辅助栈是否为空并且栈顶元素和出栈指向的元素是否相等。相等则意味着需要将当前元素从辅助栈进行弹出，同时出栈索引加一，指向下一个出栈的元素。不相等则意味着还没到弹出的时机，继续下一轮的入栈。

重复上述逻辑，直到所有的元素放入辅助栈为止。如果最终辅助栈为空，那么就说明出栈顺序是符合出栈数组的顺序的。因此对辅助栈的长度取反并返回，就是最终的结果。

### 总结

本题采用辅助栈来求解。辅助栈的作用是模拟出栈和入栈。

复杂度方面，每个元素最多出栈和入栈一次，因此时间复杂度是`O(n)` ，维护辅助栈需要占用`O(n)` 的空间。
