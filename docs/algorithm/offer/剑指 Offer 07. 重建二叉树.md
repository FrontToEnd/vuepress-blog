# **剑指Offer题解 - Day44**

## 剑指 Offer 07. 重建二叉树

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/99lxci/)

输入某二叉树的前序遍历和中序遍历的结果，请构建该二叉树并返回其根节点。

假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

示例1：

```jsx
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

**示例 2:**

```jsx
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

**限制：**

`0 <= 节点个数 <= 5000`

思路：

本题是通过先序遍历和中序遍历的结果来倒推二叉树的结构。

首先可以总结出以下规律。以下规律建立在不含重复的数字的大前提下。

- 前序遍历的时候，首个节点就是当前树的根节点，因为是前序遍历的顺序是根左右。
- 拿到根节点后，那么在中序遍历中，根节点左侧就是左子树，根节点右侧就是右子树。
- 知道了左子树的数量和右子树的数量，此时就可以将前序遍历的数组分为[根节点|左子树|右子树]
- 也就是说，**中序遍历是为了明确在前序遍历里如何分割左子树和右子树**。

知道了以上规律，我们就来实现最终代码。

### 递归

```jsx
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = (preorder, inorder) => {
    let map = new Map(); // 初始化哈希表，存储中序遍历的值与索引对应关系
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i)
    }
    const recur = (root, left, right) => { // 利用中序遍历的结果进行递归
        if (left > right) return null; // 递归终止条件
        let preRoot = preorder[root]; // 缓存当前的根节点
        let node = new TreeNode(preRoot); // 构建当前的节点
        let index = map.get(preRoot);  // 获取当前根节点在中序遍历结果中的索引
        node.left = recur(root + 1, left, index - 1);
        node.right = recur(root + index - left + 1, index + 1, right);
        return node;
    }
    return recur(0, 0, inorder.length - 1);
};
```

**时间复杂度 *O*(n)**。

**空间复杂度 *O*(n)**。

分析：

首先通过哈希表来存储中序遍历的值与索引直接的关系。

然后开始递归，递归参数的意义是根节点在前序遍历的索引 `root`、子树在中序遍历的左边界 `left`、子树在中序遍历的右边界 `right`。

当左边界超过右边界时，此时就终止递归。然后根据前序遍历的索引 `root` 获取当前值，然后构建节点。然后获取当前值在中序遍历当中的索引 `index` 。根据`index`就可以知道中序遍历里哪些是左子树，哪些是右子树。

然后开始递归左右子树。

递归左子树需要知道左子树的前序遍历的根节点的索引、中序遍历的左边界和右边界。根据前序遍历的根左右特点可以得知，当前根节点的索引的下一位就是左子树的根节点的索引。因此第一个参数是`root + 1` 。左边界依旧是`left` ，右边界应该是中序遍历的根节点的索引的上一位，因此是`index - 1` 。

递归右子树需要知道右子树的前序遍历的根节点的索引、中序遍历的左边界和右边界。根据前序遍历的根左右特点可以得知，当前根节点的索引加上左子树的长度的下一位就是右子树的根节点的索引。而左子树的长度就是中序遍历的根节点减去左边界，也就是`index - left` 。因此第一个参数是`root + index - left + 1` 。左边界应该是中序遍历的根节点的索引的下一位，因此是`index + 1` ，右边界依旧是`right` 。

最终回溯的时候返回`node` 。

### 总结

本题总结出的规律只适用于没有重复元素的二叉树。本题也比较复杂，需要多思考如何通过前序和中序遍历来构建二叉树。
