# **剑指Offer题解 - Day56**

## 剑指 Offer 29. 顺时针打印矩阵

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5vfh9g/)

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

**示例 1：**

```jsx
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

**限制：**

- `0 <= matrix.length <= 100`
- `0 <= matrix[i].length <= 100`

思路：

按照题目描述，我们需要顺时针打印矩阵中的每个数字。而顺时针打印遵循**“从左向右、从上向下、从右向左、从下向上”**的规律。

我们维护上右下左四个边界，每打印一边，就将边界往相反方向缩进一行。具体来说，

- 打印上边界所处行之后，将上边界向下缩进；
- 打印右边界所处列之后，将右边界向左缩进；
- 打印下边界所处行之后，将下边界向上缩进；
- 打印左边界所处列之后，将左边界向右缩进；
- 直到某一个边界越过了相对边界，则停止循环。

### 模拟

```jsx
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(!matrix.length) return []; // 空矩阵返回空数组
    let l = 0; // 初始化四边的边界
    let r = matrix[0].length - 1;
    let t = 0;
    let b = matrix.length - 1;
    let x = 0; // 初始化结果数组的索引
    let res = []; // 初始化结果数组
    while(true) {
        for (let i = l; i <= r; i++) res[x++] = matrix[t][i];
        if (++t > b) break;
        for (let i = t; i <= b; i++) res[x++] = matrix[i][r];
        if (l > --r) break;
        for (let i = r; i >= l; i--) res[x++] = matrix[b][i];
        if (t > --b) break;
        for (let i = b; i >= t; i--) res[x++] = matrix[i][l];
        if (++l > r) break;
    }
    return res;
};
```

- **时间复杂度 *O*(mn)**。
- **空间复杂度 *O*(1)**。

分析：

有几个点需要注意。初始化右边界和下边界的值，需要矩阵内层和外层的长度减一。给结果数组赋值的时候，通过`x++` 达到了先赋值再索引加一的效果。

判断越界条件通过先自增或自减，再判断是否越界。就可以将边界缩进的同时判断越界情况。

最终返回结果数组即可。

### 总结

本题考查矩阵打印的模拟。难点在于边界情况的考虑与循环的终止。

复杂度方面，由于需要遍历矩阵所有的节点，因此时间复杂度是`O(mn)` 。声明变量占用常数级别的空间。
