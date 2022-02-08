# **剑指Offer题解 - Day15**

## **剑指 Offer 28. 对称的二叉树**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5d412v/)

请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

示例 1：

```jsx
输入：root = [1,2,2,3,4,4,3]
输出：true
```

示例 2：

```jsx
输入：root = [1,2,2,null,3,null,3]
输出：false
```

限制：

`0 <= 节点个数 <= 1000`

思路：

根据对称二叉树的定义，我们可以得出以下结论。对于树中任意两个对称节点`left`和`right`，具有以下特点：

- `left.val === right.val` 。
- `left.left.val === right.right.val` 。
- `left.right.val === right.left.val` 。

根据以上规律，考虑从顶至底递归，判断每对左右节点是否对称，从而判断树是否为对称二叉树。

### 递归

```jsx
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const recur = (left, right) => {
    if (left === null && right === null) return true;
    if (left === null || right === null || left.val !== right.val) return false;
    return recur(left.left, right.right) && recur(left.right, right.left)
}

const isSymmetric = (root) => {
    return root === null || recur(root.left, root.right);
};h
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

上述题解代码是将对称二叉树的特点进行实现。在主函数中，如果根节点是`null`，亦是对称二叉树。否则就判断根节点的对称节点。

在递归函数中，如果左右节点都是空，那意味着只有父节点本身，也是对称的。如果左节点或者右节点为空，或者左右节点的值不同，则意味着不对称。

最后，递归调用函数，进行左左、右右以及左右、右左节点的判断。

通过`||`和`&&`的连接，达到短路运算的目的。尽可能的早点回溯，避免不必要的计算。

复杂度方面，因为每调用一次`recur`函数，就可以判断一对节点，因此最多需要调用**`二叉树节点数/2`** 次，时间复杂度为`O(n)`；当二叉树退化为链表的时候，系统需要使用`O(n)`的空间，因此空间复杂度是O(n)。

### 总结

本题考查递归函数的编写，以及用代码实现**对称二叉树**的特点。再总结一遍，对于树中任意两个对称节点`left`和`right`，具有以下特点：

- `left.val === right.val` 。
- `left.left.val === right.right.val` 。
- `left.right.val === right.left.val` 。