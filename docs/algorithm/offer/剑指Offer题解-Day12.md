# **剑指Offer题解 - Day12**

## **剑指 Offer 32 - III. 从上到下打印二叉树 III**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5vnp91/)

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

例如:

给定二叉树:`[3,9,20,null,null,15,7]` 

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [20,9],
  [15,7]
]
```

**提示：**

1. `节点总数 <= 1000`

思路：

本题是在上一题的基础上，进一步的变种题目。上一题每行都是从左到右进行元素放置，现在需要知道奇偶行，来决定正序放置还是倒序放置。

由于正序倒序是交替进行，那么可以通过标志位取反的操作来判断数组如何放置元素。

### 逆转

```jsx
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    let queue = [root];
    let result = [];
    let order = true; // 增加标志位来判断奇偶行
    while(queue.length) {
        let temp = [];
        let length = queue.length;
        for (let i = 0; i < length; i++) {
            let value = queue.shift();
            if (!value) continue;
            temp.push(value.val);
            if (value.left) queue.push(value.left)
            if (value.right) queue.push(value.right)
        }
        result.push(order ? temp : temp.reverse()); //奇数行直接放置，偶数行需要先倒置
        order = !order; // 标志位取反，方便下一次判断
    }
    return result;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

通过标志位来决定临时数组放入结果数组中，是正序还是逆序。由此可以达成之字形的打印顺序。

### 双端队列

方法一是将临时数组遍历完成后，通过奇数偶数行判断来决定是正序还是逆序。本方法使用数组来模拟双端队列。当是奇数行时，则添加至尾部；当是偶数行时，则添加至头部。相当于提前将临时数组内的顺序进行排列。

```jsx
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    let queue = [root];
    let result = [];
    let order = true;
    while(queue.length) {
        let temp = [];
        let length = queue.length;
        for (let i = 0; i < length; i++) {
            let value = queue.shift();
            if (!value) continue;
						// 此处进行奇偶性判断，奇数添加末尾，偶数添加头部
            order ? temp.push(value.val) : temp.unshift(value.val);
            if (value.left) queue.push(value.left)
            if (value.right) queue.push(value.right)
        }
        result.push(temp);
        order = !order; // 标志位取反
    }
    return result;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

### 总结

奇偶性的判断，采用了标志位取反的做法。因为奇数和偶数是交替出现，所以取反可以达到目的。同样的，我们可以通过判断结果数组`result` 的长度来区分奇偶行。当`(result.length) % 2 === 0`时，意味着我们正在处理奇数行，`(result.length) % 2 !== 0` 时，意味着我们正在处理偶数行。由此可以达到判断奇偶性的目的。

两个方法分别采用了数组倒置和双端队列的思路进行题解。双端队列更能体现所掌握该数据结构特性的程度，不过前端本身没有原生的双端队列实现，需要通过数组进行模拟，如果数据量很大的时候，数组头部插入数据的效率就会很慢，此时直接逆转数组更合适。