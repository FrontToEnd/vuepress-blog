# **剑指Offer题解 - Day68**

## 剑指 Offer 14- II. 剪绳子 II

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5vcapc/)

给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m - 1]` 。请问 `k[0]*k[1]***...*k[m - 1]`可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

**示例 1:**

```jsx
输入:10
输出:36
解释:10 = 3 + 3 + 4, 3 × 3 × 4 = 36
```

**提示：**

- `2 <= n <= 1000`

分析：

本题是[剪绳子I](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5v1026/) 的升级版，建议先看第一部分的代码。既然是需要取模的，那么不难写出如下代码：

```jsx
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    if (n <= 3) return n - 1;
    let a = Math.floor(n / 3);
    let b = n % 3;
    if (b === 0) return Math.pow(3, a) % 1000000007;
    else if (b === 1) return (Math.pow(3, a - 1) * 4) % 1000000007;
    else return (Math.pow(3, a) * 2) % 1000000007;
};
```

按理来说，我们直接对结果取模再返回就能得出正确答案。但是我们忽略了大数问题。根据题目提示，n最多可以达到1000，也就是说，指数级别可达到333，计算结果肯定是错误的。

所以，现在最大的问题就在于如何针对大数进行取模运算？

大数取模可以通过循环求余和快速幂求余来求解。不管是哪种方式，都基于以下公式：

`(xy) % p = [(x % p)(y % p)] % p`

### 循环求余

根据上述公式，可以推算出以下公式：

`(x^a) % p = [(x^(a - 1) % p)(x % p)] % p`

而`x < p`，所以`x % p = x` 。因此可以简化为：`[(x^(a - 1) % p)x] % p`

由此可以计算出`x^1`直到`x^a`对p的余数。

我们再来修改下上述代码：

```jsx
/**
 * @param {number} n
 * @return {number}
 */
const remainder = (x, a, p = 1000000007) => {
    let rem = 1;
    for (let i = 0; i < a; i++) {
        rem = (rem * x) % p;
    }
    return rem;
}

var cuttingRope = function(n) {
    if (n <= 3) return n - 1;
    let a = Math.floor(n / 3);
    let b = n % 3;
    let p = 1000000007;
    if (b === 0) return remainder(3, a);
    else if (b === 1) return (remainder(3, a - 1) * 4) % p;
    else return (remainder(3, a) * 2) % p;
};
```

需要注意的是，最终返回值由于会乘以4或者2，因此最终也需要进行求余处理。

### 快速幂求余

所以快速幂，就是快速的拆解指数，避免重复运算。根据求余公式可以得出：

`(x ^ a) % p = [(x^2)^(a/2)] % p = [(x^2 % p)^(a/2)] % p`

当a为偶数或者奇数时，又可以细分为下面公式：

- a为偶数时：`[(x^2 % p)^(a/2)] % p`
- a为奇数时：`[x(x^2 % p)^(a/2)] % p`
- a / 2表示向下取整。

经过整理，最终代码如下：

```jsx
/**
 * @param {number} n
 * @return {number}
 */
const remainder = (x, a, p = 1000000007) => {
    let rem = 1;
    while (a > 0) {
        if (a % 2) rem = (rem * x) % p;
        x = (x ** 2) % p
        a = Math.floor(a / 2);
    }
    return rem
}

var cuttingRope = function(n) {
    if (n <= 3) return n - 1;
    let a = Math.floor(n / 3);
    let b = n % 3;
    let p = 1000000007;
    if (b === 0) return remainder(3, a);
    else if (b === 1) return (remainder(3, a - 1) * 4) % p;
    else return (remainder(3, a) * 2) % p;
};
```

### 总结

本题分别采用循环求余和快速幂求余的方式，来避免大数求余而超出数值范围的问题。
