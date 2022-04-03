# **剑指Offer题解 - Day62**

## 剑指 Offer 37. 序列化二叉树

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/990pf2/)

请实现两个函数，分别用来序列化和反序列化二叉树。

你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

提示：输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

示例：

```jsx
输入：root = [1,2,3,null,null,4,5]
输出：[1,2,3,null,null,4,5]
```

思路：

按照题目描述，可以总结出：

- 序列化和反序列化是可逆操作，因此需要携带完整的二叉树信息，包括空节点。
- 打印出的二叉树信息是层序遍历的结果，而层序遍历需要使用队列来实现。

因此，核心问题就来到了如何完整的打印出二叉树？

相较于普通的二叉树打印，此题多了额外一步，就是当前节点为空时，需要将`null`存储到结果数组中。

首先先看下完整的代码：

### BFS

```jsx
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if(!root) return '[]'; // 二叉树为空，返回'[]'
    let queue = [root]; // 广度优先遍历逻辑
    let res = [];
    while(queue.length) {
        const node = queue.shift();
        if (node) {
            res.push(node.val);
            queue.push(node.left, node.right);
        } else {
            res.push(null); // 节点为空，插入null
        }
    }
    return JSON.stringify(res); // 返回序列化的结果数组
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (data === '[]') return null;
    let valList = data.slice(1, -1).split(','); // 去除'['和']'，并转换为数组
    let root = new TreeNode(+valList[0]); // 初始化根节点
    let queue = [root]; // 按照BFS方式遍历valList
    let i = 1;
    while(queue.length) {
        let node = queue.shift();
        if (valList[i] !== 'null') {
            node.left = new TreeNode(+valList[i])
            queue.push(node.left);
        }
        i++;
        if (valList[i] !== 'null') {
            node.right = new TreeNode(+valList[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
};
```

- **时间复杂度 *O*(n)**。
- **空间复杂度 *O*(n)**。

分析：

首先来看 **序列化** 的逻辑。比普通的二叉树打印多了插入null的操作，其余代码都是一样的。最终返回结果数组的序列化。

重点来看 **反序列化** 的逻辑。由于序列化是按照BFS来填入数据，那么反序列化依旧可以采用BFS来还原数据，当然也需要额外处理`null`的逻辑。

因为存储的节点包含了`null`，所以节点的左右子节点信息满足`2i + 1`和`2i + 2` 。

开始遍历`valList`，如果当前节点不是null，意味着是左子节点，构建新的节点并赋值给`node.left` 。然后执行`i++`。如果当前节点不是null，意味着是右子节点，构建新的节点并赋值给`node.right` 。然后执行i++。

说白了就是左右子节点是成双成对的，不管是否为null。要么没有左右子节点，要么同时存在左右子节点。因此这里需要判断两次，累加两次。其余的代码就是BFS逻辑。

最终返回根节点即可。

### 总结

本题考查二叉树BFS相关。核心额外需要处理节点是null的情况。

复杂度方面，需要遍历整个二叉树，因此时间复杂度是`O(n)` 。辅助队列中最多存在一半的节点，因此空间复杂度是`O(n)` 。
