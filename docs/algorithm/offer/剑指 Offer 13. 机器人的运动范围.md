# **剑指Offer题解 - Day31**

## **剑指 Offer 13. 机器人的运动范围**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/9h6vo2/)

地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

**示例 1：**

```jsx
输入：m = 2, n = 3, k = 1
输出：3
```

**示例 2：**

```jsx
输入：m = 3, n = 1, k = 0
输出：1
```

**提示：**

- `1 <= n,m <= 100`
- `0 <= k <= 20`

思路：

本题与剑指Offer12的题目类似，可以通过DFS来求解。首先给出代码，然后再具体分析。

### DFS

```jsx
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// 计算位数之和
const sums = (n) => {
    let s = 0;
    while(n) {
       s += n % 10;
       n = Math.floor(n / 10) 
    }
    return s;
}

// 深度优先遍历
const dfs = (i, j, si, sj, m, n, k, visited) => {
    if (i >= m || j >= n || si + sj > k || visited[i][j]) return 0;
    visited[i][j] = true;
    return 1 + dfs(i + 1, j, sums(i + 1), sj, m, n, k, visited) + dfs(i, j + 1, si, sums(j + 1), m, n, k, visited);
}

const movingCount = (m, n, k) => {
  // 初始化矩阵，保存当前节点是否已访问的标志位
    const visited = Array.from(Array(m), () => Array(n).fill(false));
    return dfs(0, 0, 0, 0, m, n, k, visited)
};
```

- **时间复杂度 *O*(mn)**。
- **空间复杂度 *O*(mn)**。

分析：

我们从主函数开始分析。首先初始化一个二维数组，用来存储某个节点是否已访问的标志位，默认都初始化为`false` 。然后开始搜索。

进入深度优先遍历函数。首先给出递归终止条件。这里的终止条件分为三种，分别是：

- 行或者列越界。因为是从左上角开始移动的，因此搜索时只需要往右或者往下即可。
- 当前节点的坐标位数之和大于目标值。
- 当前节点已被访问过。

如果不满足终止条件，意味着搜索还没有结束。此时将当前节点的标志位置为`true`，防止重复访问。返回值是当前一次的成功遍历加上下一行的搜索再加上下一列的搜索。

位数之和的逻辑是累加给定数字的个位数，最终将位数之和返回。

### BFS

本题也可以通过广度优先遍历进行求解。代码如下：

```jsx
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const sums = (n) => {
    let s = 0;
    while(n) {
       s += n % 10;
       n = Math.floor(n / 10) 
    }
    return s;
}

const movingCount = (m, n, k) => {
    let res = 0; // 初始化结果，默认为0
    const queue = [[0, 0, 0, 0]] // 初始化队列
    const visited = Array.from(Array(m), () => Array(n).fill(false));
    while(queue.length) {
        const current = queue.shift();
        const [i, j, si, sj] = current;
        if (i >= m || j >= n || si + sj > k || visited[i][j]) continue;
        visited[i][j] = true;
        res++;
        queue.push([i + 1, j, sums(i + 1), sj])
        queue.push([i, j + 1, si, sums(j + 1)]);
    }
    return res;
};
```

- **时间复杂度 *O*(mn)**。
- **空间复杂度 *O*(mn)**。

分析：

`DFS`和`BFS`的大体思路是一样的，只不过`BFS`是使用了队列来代替深层次的调用栈。这里队列的每一项是一个数组，方便进行解构。

当不满足条件时，直接进入下一次循环。当满足条件时：结果累加，同时将下一行和下一列放入队列末尾，等待后续处理。

直到队列为空，将最终累加的结果返回即可。

### 总结

遇到矩阵搜索问题，考虑采取DFS和BFS。

在复杂度方面：最坏情况下，需要走遍所有节点，因此时间复杂度是`O(mn)` 。最坏情况下，需要额外存储矩阵中所有节点的索引，因此空间复杂度是`O(mn)` 。
