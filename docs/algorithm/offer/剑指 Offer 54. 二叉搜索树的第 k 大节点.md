# **剑指Offer题解 - Day34**

## **剑指 Offer 54. 二叉搜索树的第 k 大节点**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/58df23/)

给定一棵二叉搜索树，请找出其中第`k`大的节点的值。

**示例 1:**

```jsx
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4
```

**限制：**

- 1 ≤ k ≤ 二叉搜索树元素个数

思路：

看到二叉搜索树的题目，首先想到中序遍历。此处需要求出第`K`大的节点，那么可以先中序遍历，将节点的值放入结果数组中，然后取增序数组的倒数第`K`个元素即可。

### 中序遍历

```jsx
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    if (!root) return null; // 二叉搜索树不存在则返回null
    let res = []; // 初始化结果数组
    const dfs = (cur) => { // 中序遍历
        if (!cur) return; // 递归终止条件
        dfs(cur.left); // 左中右的顺序
        res.push(cur.val); // 将当前节点值放入结果数组
        dfs(cur.right)
    }
    dfs(root);
    return res[res.length - k] // 返回增序数组的倒数第K个元素
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

借由二叉搜索树中序遍历的特性来拿到增序数组。然后返回数组中倒数第`K`个元素，也就是第`K`大的节点。该方法简单易懂，不足之处就是需要额外维护一个结果数组。本题还有更优解。

### 中序遍历倒序

由于二叉搜索树的中序遍历是增序序列。那么中序遍历的倒序就是降序序列。本题可以转换为求解中序遍历倒序的第`K`个元素。

```jsx
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
    if (!root) return null;
    let res = null; // 初始化结果变量
    let count = k; // 初始化计数变量
    const dfs = (cur) => {
        if (!cur) return;
        dfs(cur.right);
        if (count === 0) return;
        if(--count === 0) res = cur.val;
        dfs(cur.left);
    }
    dfs(root);
    return res;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

该方法与中序遍历最大的不同在于遍历的顺序。中序遍历是左中右，逆序便是右中左。由于我们需要找到第`k`个元素，这里声明一个计数变量`count`，默认值就等于`k`。每次递归都进行递减，当`count` 递减为`0`时，则找到了第`k`个元素。

当`count`为`0`时，就没有继续递归的必要，所以可以直接返回。第一个判断为`0`的条件是下一次递归时会触发的条件。而第二个判断为`0`的条件将递减和判断合二为一，是本次递归时会触发的条件。当递减为0时，将当前节点的值赋值给`res`，并在递归结束后返回。

### 总结

本题分别采用中序遍历的正序和逆序进行题解。正序需要额外维护一个数组，用来获取倒数第`k`个元素。而逆序只需要遍历到第`k`个元素直接返回即可。

复杂度方面，正序递归会遍历树的所有节点，因此时间复杂度是`O(n)` 。逆序递归时当树退化为链表时，也需要遍历树的所有节点，因此时间复杂度是`O(n)` 。空间复杂度同理，当树退化为链表时，会使用`O(n)`大小的栈空间。
