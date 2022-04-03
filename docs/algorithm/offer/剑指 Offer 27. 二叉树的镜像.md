# **剑指Offer题解 - Day14**

## **剑指 Offer 27. 二叉树的镜像**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/59zt5i/)

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

例如输入：

```jsx
    4
   /   \
  2     7
 / \   / \
1   3 6   9
```

镜像输出：

```jsx
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

示例 1：

```jsx
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

限制：

`0 <= 节点个数 <= 1000`

思路：

得到二叉树的镜像，本质就是将每个节点的左右子节点进行交换，如此我们可以考虑使用递归处理。

### 递归

```jsx
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 交换当前节点的左右子节点引用
const swap = (root) => {
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
}
// 递归处理
const mirrorTree = (root) => {
    if(!root) return null; // 如果节点不存在，则返回null，递归的终止条件
    swap(root); // 交换当前节点的左右子节点
    if (root.left) mirrorTree(root.left) // 如果存在左子节点，则处理左子节点
    if (root.right) mirrorTree(root.right) // 如果存在右子节点，则处理右子节点
    return root; // 返回根节点
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

需要遍历二叉树的所有节点，因此时间复杂度是`O(n)` ；最差情况下（当二叉树退化为链表），递归时系统需使用 `O(n)` 大小的栈空间。

处理递归的问题，需要将大问题拆分成子问题，并且需要处理递归终止的条件。利用递归回溯的特点，可以在递归里面进行交换，不需要显示的进行左右子节点的交换操作，代码如下：

### 递归优化

```jsx
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const mirrorTree = (root) => {
    if(!root) return null;
    let temp = root.left;
    root.left = mirrorTree(root.right);
    root.right = mirrorTree(temp);
    return root;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

### 辅助栈

本题也可以采用辅助栈的思路进行解决。辅助栈的目的其实就是为了遍历二叉树的所有节点。通过弹出每个节点的时候，将节点进行交换，达到交换整个二叉树左右子树的目的。

```jsx
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const swap = (node) => {
    let temp = node.left;
    node.left = node.right;
    node.right = temp;
}
const mirrorTree = (root) => {
    if(!root) return null;
    let stack = [root]; // 栈中默认放置根节点，方便循环
    while(stack.length) {
        let node = stack.pop(); // 弹出栈顶元素
        if (node.left) stack.push(node.left); // 将当前节点的子节点放入栈中，后续循环处理
        if (node.right) stack.push(node.right);
        swap(node); // 交换左右子节点
    }
    return root;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

该方法使用的是迭代+辅助栈的思路。依旧是遍历二叉树的每个节点，依次交换左右子节点，达到目的。

### 总结

本题一共使用了递归和迭代两种方式实现了二叉树的镜像。很多时候，面试会要求既要用递归实现，也要用迭代实现，掌握两者都是很有必要的。

其中，我们要清楚递归的特性，写好递归终止条件。本题的迭代方法，既可以使用栈，也可以使用队列来进行辅助。不管使用哪种，目的都是遍历二叉树的每一个节点。