# **剑指Offer题解 - Day39**

## 剑指 Offer 55 - I. 二叉树的深度

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/9hgr5i/)

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

例如：

给定二叉树 `[3,9,20,null,null,15,7]`

```
  3
 / \
9  20
  /  \
 15   7
```

返回它的最大深度 3 。

**提示：**

1. `节点总数 <= 10000`

思路：

根据题目要求，要求出二叉树的深度。首先会想到使用`DFS`或者`BFS`进行题解。

### DFS

使用递归实现`DFS`。递归里的核心逻辑是：树的深度等于左子树的深度和右子树的深度的最大值加一。递归终止条件是，如果当前节点为`null`，则当前节点不包含在深度内，返回`0`。

由此可得以下代码：

```jsx
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;
    return Math.max((maxDepth(root.left)), maxDepth(root.right)) + 1;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

这里使用了递归来实现`DFS`。复杂度方面，需要遍历二叉树的所有节点，所以时间复杂度是`O(n)` ，当二叉树退化为链表时，调用栈会占用`O(n)` 的空间。

### BFS

使用队列来实现BFS。核心逻辑是：每遍历到二叉树的一层，计数器就加一。遍历完二叉树的所有层，得到的计时器的值便是二叉树的深度。

```jsx
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0; // 二叉树为空则返回0
    let queue = [root]; // 队列中默认添加根节点，方便循环
    let res = 0; // 初始化计数器
    while(queue.length) {
        const length = queue.length; // 获取当前层节点个数
        for (let i = 0; i < length; i++) {
          const cur = queue.shift();
          if (cur.left) queue.push(cur.left);
          if (cur.right) queue.push(cur.right);
        }
        res++; // 计数器累加
    }
    return res; // 返回计数器
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

该解法与普通的BFS有两处不同。

第一，弹出队列中的元素前，缓存队列的长度，因为队列的长度就是二叉树每一层的节点数。然后循环长度次数，依次将每一层的节点进行处理。

第二，处理完每一层的节点之后，将计数器进行累加。最终计数器的值便是二叉树的深度。

最后返回计数器的值即可。

复杂度方面，需要遍历二叉树的所有节点，因此时间复杂度是`O(n)` 。当二叉树平衡时，队列中最多存储`n / 2`个节点，因此空间复杂度是`O(n)`。

### 总结

本题分别采用DFS和BFS进行题解。需要掌握两种遍历的代码逻辑思路，同时需要注意广度遍历解法与普通BFS的区别。
