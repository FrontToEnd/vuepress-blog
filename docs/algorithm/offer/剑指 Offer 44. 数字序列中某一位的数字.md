# **剑指Offer题解 - Day71**

## 剑指 Offer 44. 数字序列中某一位的数字

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/57vzfh/)

数字以0123456789101112131415…的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

请写一个函数，求任意第n位对应的数字。

**示例 1：**

```jsx
输入：n = 3
输出：3
```

**限制：**

- `0 <= n < 2^31`

分析：

根据题目描述，本题是要寻找规律求解。

首先给出以下概念：

- 将数字的每一位记为n（也就是101112中的每一位）；
- 将序列化中的数字记为num（也就是10，11，12）；
- 将数字的位数记为digit（也就是1，2，3）；
- 将位数的起始位置记为start（也就是1，10，100）;

通过给出的几个概念，可以得到以下规律：

- 位数为1时，一共包括1 *1* 9 = 9个位（也就是1~9）；
- 位数为2时，一共包括2 *10* 9 = 180个位（也就是10~99）；
- 位数为3时，一共包括3 *100* 9 = 2700个位（也就是100~999）；
- 位数为digit时，一共包括`digit * start * 9`个位。

解答本题，需要明确以下三个问题：

- 要确定n所在数字的位数digit，确定了位数才能进一步确定是哪个数字；
- 要确定n所在的数字num，确定了数字才能进一步确定到底是数字的第几位；
- 要确定n是num的第几位，最终返回位即可；

1. 先来看第一个问题，确定n所在数字的位数digit。

根据刚才的分析，可以通过以下操作进行求出位数digit。

```jsx
let digit = 1;
let start = 1;
let count = 9; // 1 * 1 * 9
while (n > count) {
   n -= count;
   start *= 10; // 1, 10, 100, ...
   digit += 1;  // 1,  2,  3, ...
   count = digit * start * 9; // 9, 180, 2700, ...
}
```

核心逻辑就是对n不断的减去相应位数的所有位，直到 `n<= count`为止。此时的digit就是n所在数字的位数。此时的n就是从start开始的第n位。

1. 继续看第二个问题，确定n所在的数字num。

我们目前已经知道了位数digit，而且也知道位数的起始值start。可以通过下面的方式求出数字num。

```jsx
let num = start + Math.floor((n - 1) / digit);
```

因为位数digit就表示着每digit位是一个数字，因此需要`Math.floor((n - 1) / digit)` ，然后加上起始位置start，得到的就是所在数字。

1. 最后一个问题，确定数字的第几位。

```jsx
let index = (n - 1) % digit;
```

所在位依旧跟位数有关，因为n是位数为digit的第n位，每个数字都占据digit个位，因此需要求余取得最终位置。

而n - 1是因为从第0位开始计数，因此需要减去0。

至此，我们也求出了答案，下面是最终代码：

```jsx
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    let digit = 1;
    let start = 1;
    let count = 9;
    while( n > count) { // 求出digit
        n -= count;
        start *= 10;
        digit += 1;
        count = digit * start * 9;
    }
    let num = start + Math.floor((n - 1) / digit); // 求出num
    return +`${num}`.charAt((n - 1) % digit); // 求出所在位
};
```

- **时间复杂度 *O*(logn)**。
- **空间复杂度 *O*(logn)**。

### 总结

本题考查数学规律，难度系数困难。核心难点在于如何通过位数的规律找出最终的所在位。
