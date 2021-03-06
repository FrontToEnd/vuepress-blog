# **剑指Offer题解 - Day20**

## **剑指 Offer 47. 礼物的最大价值**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5vokvr/)

在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

示例 1:

```jsx
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
```

提示：

- `0 < grid.length <= 200`
- `0 < grid[0].length <= 200`

思路：

如果采用暴力法求解，会发现时间复杂度是指数级别的，因此不考虑暴力法。

通过我们上次总结出的动态规划的精髓：首先达到局部最优解，进而达到全局最优解。

首先，我们需要找到动态规划方程，接下来一步步分析：

- 我们假定`grid[i][j]` 是当前能拿到的最大价值礼物，根据题目描述，我们的上一步只可能来自上边或者左边，因此可以得出以下公式：
- `grid[i][j] += grid[i][j] + Math.max(grid[i][j - 1], grid[i - 1][j])`
- 也就是说，当前礼物价值最大是当前值加上左边或者上边的较大值。
- 当位于左上角，也就是grid[0][0]时，本身就是礼物价值最大的值，这也是动态规划的初始值。
- 同时，需要处理边界情况，当位于第一行时，礼物只可能来自于左侧；当位于第一列时，礼物只可能来自于上侧。

基于以上分析，我们得出：

### 动态规划

```jsx
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    let m = grid.length; // 缓存矩阵的行数
    let n = grid[0].length; // 缓存矩阵的列数
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue; // 左上角的值就是最大，无需再处理，直接跳过
            else if (i === 0) grid[i][j] += grid[i][j - 1] // 第一行直接取左侧值与当前值相加
            else if (j === 0) grid[i][j] += grid[i - 1][j] // 第一列直接取上侧值与当前值相加
            else grid[i][j] += Math.max(grid[i][j - 1], grid[i - 1][j]) // 取上侧和左侧的最大值与当前值相加
        }
    }
    return grid[m - 1][n - 1]; // 返回矩阵右下角的值就是最大值
};
```

- **时间复杂度 *O*(mn)**。
- **空间复杂度 *O*(1)**。

分析：

复杂度方面，由于动态规划需要遍历整个矩阵，因此时间复杂度是矩阵的行列相乘。而我们是对矩阵原地修改，所以空间复杂度是`O(1)` 。

如果不针对矩阵原地修改，那么需要维护额外的`O(mn)`的空间来存储比较出来的最大值，显然不是最优解。

其实，本题还有优化的空间。如果矩阵很大的时候，第一行和第一列并不是每次都会遇到，所以上述代码在大部分的时候不会进入两个`else if` 分支。因此，可先初始化矩阵第一行和第一列，再开始遍历递推。

### 动态规划优化

```jsx
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    for(let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0]
    }
    for(let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1]
    }
    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            grid[i][j] += Math.max(grid[i - 1][j], grid[i][j - 1])
        }
    }
    return grid[m - 1][n - 1];
};
```

- **时间复杂度 *O*(mn)**。
- **空间复杂度 *O*(1)**。

分析：

对比上一个题解，这里做了如下优化：

- 率先处理第一行和第一列的数据，如此可以确保每个值都是最优解，在遍历内层数据的时候直接获取即可。
- 遍历非第一行和第一列的数据，由于前面两个循环已经将第一行和第一列处理成最优解，此时直接获取左侧或者上侧的最大值即可。
- 最终返回矩阵的右下角的值，即最大值。

### 总结

此题考查动态规划的求解。通过前几天的做题，我们可以得出一个普遍的规律：

遇到数组类型的动态规划时，优化点在于原地修改，这样做可以将空间复杂度降低至常量级别`O(1)`。

根据题目的不同，比如今天这道题可以进一步降低遍历的冗余度，防止临界点情况每次都进行分支判断，增加代码的运行时间。