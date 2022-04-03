# **剑指Offer题解 - Day42**

## 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/575kd2/)

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

示例 1:

```jsx
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6
解释: 节点 2 和节点 8 的最近公共祖先是 6。
```

示例 2:

```jsx
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
```

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉搜索树中。

思路：

根据题目的已知条件，可以得出以下结论。

如果`root`是节点`p`和`q`的最近公共祖先，那么会出现三种情况：

- p、q节点分布在root的左右子树中。
- p就是root节点，且q在root的左右子树中。
- q就是root节点，且p在root的左右子树中。

题目给出，二叉树是搜索树，而节点值是唯一的。因此：

- 当p节点小于root时，意味着存在于左子树中。
- 当p节点大于root时，意味着存在于右子树中。
- 当p节点等于root时，意味着就是root节点。

### 递归

```jsx
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
}
```

**时间复杂度 *O*(n)**。

**空间复杂度 *O*(n)**。

分析：

首先使用递归进行求解。

当两个节点的值都小于`root`的值时，意味着最近公共节点位于`root`的左子树；

当两个节点的值都大于`root`的值时，意味着最近公共节点位于`root`的右子树；

当两个节点位于`root`的两侧时，意味着`root`本身就是最近公共节点，返回`root`即可。

复杂度方面，当二叉树退化为链表时，空间和时间复杂度都为`O(n)` 。

### 迭代

```jsx
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    while(root) {
        if (root.val > p.val && root.val > q.val) {
            root = root.left;
        } else if (root.val < p.val && root.val < q.val) {
            root = root.right;
        } else {
            break;
        }
    }
    return root;
};
```

**时间复杂度 *O*(n)**。

**空间复杂度 *O*(n)**。

分析：

迭代的思路跟递归类似，这里就不赘述了。

### 总结

本题分别使用递归和迭代的方式进行求解。求解是建立在题目要求的基础上，因为二叉搜索树有自己独特的特征。左子树的值小于当前节点，右子树的值大于当前节点。
