# 剑指 Offer 题解 - Day11

## **剑指 Offer 32 - I. 从上到下打印二叉树**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/9ackoe/)

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

例如:

给定二叉树:`[3,9,20,null,null,15,7]`

```jsx
    3
   / \
  9  20
    /  \
   15   7
```

返回：`[3,9,20,15,7]`

**提示：**

1. `节点总数 <= 1000`

思路：

从上到下打印二叉树，本质上考查对二叉树的**广度优先遍历**。而广度优先遍历需要采用队列进行数据的存放，具体代码如下：

### BFS

```jsx
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function (root) {
  let queue = [root]; // 队列中默认存入根节点，方便循环判断以及取出
  let result = []; // 初始化结果数组
  while (queue.length) {
    // 只要队列有值，就进行循环
    let value = queue.shift(); // 取出队列头部节点，并缓存
    if (!value) continue; // 如果节点为null，则进行下一次循环
    result.push(value.val); // 不为null就将节点的值存入结果数组
    if (value.left) queue.push(value.left); // 如果取出的节点存在子节点，则一次放入队列尾部
    if (value.right) queue.push(value.right);
  }
  return result; // 返回结果数组
};
```

- **时间复杂度  *O*(n)**。
- **空间复杂度  *O*(n)**。

分析：

使用队列实现广度优先遍历，利用了队列先进先出的特性。当节点存在子节点时，依次将他们放入队列末尾。相当于每一层的元素在队列里都是相邻的，达到了逐层遍历的效果。

复杂度方面：需要遍历整个二叉树的节点，因此时间复杂度为`O(n)` ；当树为平衡二叉树时，队列里最多存放树的一半节点，因此空间复杂度是`O(n)`。

## **剑指 Offer 32 - II. 从上到下打印二叉树 II**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5vawr3/)

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

例如:
给定二叉树: `[3,9,20,null,null,15,7]`

```jsx
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```jsx
[[3], [9, 20], [15, 7]];
```

**提示：**

1. `节点总数 <= 1000`

思路：

本题是在广度优先遍历的基础上，将每一层的元素放入二维数组的每一项。因此我们需要通过某种方式来区分不同节点的层级关系。

我们使用一个临时数组来存放当前层级的节点，然后缓存当前队列的长度。因为当前队列的长度就是本层节点的个数。通过遍历依次将队列中的值放入临时数组，遍历结束将临时数组放至结果数组。

```jsx
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []; // 处理空节点的情况
  let queue = [root];
  let result = [];
  while (queue.length) {
    let temp = []; // 初始化临时数组，存放当前层的节点
    let length = queue.length; // 缓存队列长度，表示当前层节点个数
    for (let i = 0; i < length; i++) {
      let value = queue.shift();
      if (!value) continue;
      temp.push(value.val); // 存入队列头部节点
      if (value.left) queue.push(value.left); // 存入子节点到队列中
      if (value.right) queue.push(value.right);
    }
    result.push(temp); // 将本层节点组成的数组存入结果数组中
  }
  return result;
};
```

- **时间复杂度  *O*(n)**。
- **空间复杂度  *O*(n)**。

分析：

广度优先遍历的同时，通过缓存队列的长度，来获取当前层的元素个数。然后循环指定的次数将当前层的元素依次存入临时数组中，循环结束后将临时数组放入结果数组中。达到了每层元素占据二维数组每一项的目的。

## 总结

从上到下打印二叉树需要采用广度优先遍历的方法。在此基础上，题目会有所变化，但是核心依旧是要掌握广度优先遍历的写法。在明天的题解中，是该类型的第三个变种，具体分析敬请期待。
