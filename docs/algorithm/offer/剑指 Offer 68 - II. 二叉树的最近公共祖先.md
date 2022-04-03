# **剑指Offer题解 - Day43**

## 剑指 Offer 68 - II. 二叉树的最近公共祖先

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/57euni/)

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

示例 1:

```jsx
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

示例 2:

```jsx
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉树中。

思路：

本题是昨天题解的升级版。昨天的题目中，规定了是二叉搜索树。今天的题目没有该规定，因此无法使用二叉搜索树的特征来进行题解。

### 递归

本题采用递归进行题解。

如果`root`是节点`p`和`q`的最近公共祖先，那么会出现三种情况：

- p、q节点分布在root的左右子树中。
- p就是root节点，且q在root的左右子树中。
- q就是root节点，且p在root的左右子树中。

首先看下递归的终止条件：

- 当root节点为空时，直接返回root节点。
- 当root节点就是p或者q节点时，直接返回root节点，因为root节点就是最近公共祖先。

递归的主流程为分别递归左子树和右子树，并缓存结果为`left`或`right`。

结果分为以下四种情况：

- 当`left`和`right`都为空，意味着`p`和`q`不存在于`root`的左子树和右子树，直接返回`null`。
- 当`left`和`right`都不为空，意味着`p`和`q`分别位于`root`的左右子树，那么此时`root`就是最近公共节点，直接返回`root`。
- 当`left`为空，`right`不为空时，意味着`p`和`q`都在右子树中，直接返回`right`。
- 当`left`不为空，`right`为空时，意味着`p`和`q`都在左子树中，直接返回`left`。

那么就可以写出如下代码：

```jsx
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root; // 递归终止条件
    let left = lowestCommonAncestor(root.left, p, q); // 缓存左子树结果
    let right = lowestCommonAncestor(root.right, p, q); // 缓存右子树结果
    if (!left) return right; // 分别是上面的四种情况
    if (!right) return left;
    return root;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

不难发现，上面分析的第一种情况可以归置到第三和第四中情况当中。

因此最终的代码中不需要再进行第一种情况的判断。

### 总结

本题与上一题的区别就是无法直接使用二叉搜索树的结论进行题解。所以要分别判断左子树和右子树的情况。

复杂度方面，最坏情况下，需要遍历二叉树的所有节点，因此时间复杂度是`O(n)` 。而递归的函数调用栈最多也需要`O(n)` 的空间。
