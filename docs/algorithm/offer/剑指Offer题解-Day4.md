# 剑指Offer题解-Day4

## **剑指 Offer 05. 替换空格**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/50ywkd/)

请实现一个函数，把字符串 `s` 中的每个空格替换成"`%20`"。

示例1：

```jsx
输入：s = "We are happy."
输出："We%20are%20happy."
```

限制：

`0 <= s 的长度 <= 10000`

思路：

首先考虑使用字符串的API来解题，本题使用`replaceAll()`来替换空格。

### replaceAll

```jsx
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    return s.replaceAll(' ', '%20') // 将字符串内的全部空格替换为%20
};
```

分析：

当然，该方法可以在工作中使用，但是不建议在面试中采用此方法。

### 遍历

如果不使用字符串的API，那么可以通过遍历字符串，并且累加遍历到的字符。同时遇到空格则累加`%20` 。

```jsx
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    let res = '';
    for (let i = 0; i < s.length; i++) {
        res += s[i] === ' ' ? '%20' : s[i];
    }
    return res;
};
```

由于在`JavaScript`中，字符串是**不可变**的，因此需要额外声明空字符串进行累加处理，但是每次都会返回新字符串，比较消耗空间，因此上面遍历可以考虑使用数组进行存储。

```jsx
var replaceSpace = function(s) {
    let res = [];
    for (let i = 0; i < s.length; i++) {
				let temp = s[i];
        res[i] = temp === ' ' ? '%20' : temp;
    }
    return res.join(''); // 使用空字符串进行拼接数组元素并返回
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

### 总结

本题考查字符串的遍历，并对题解做了优化处理。

## **剑指 Offer 58 - II. 左旋转字符串**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/589fz2/)

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

示例1：

```jsx
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

示例2：

```jsx
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```

限制：

- `1 <= k < s.length <= 10000`

思路：

首先考虑使用字符串的API来进行字符串分割和拼接，这里使用`slice()` 来进行字符串分割。

### slice

```jsx
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    return s.slice(n) + s.slice(0, n)
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

分析：

同样的，尽量不要在面试中使用此方法，工作中可以使用`slice`进行字符串的截取。注意该方法是左闭右开。

### 遍历

首先初始化一个数组用来存放结果。遍历字符串`[n，s.length - 1]`区间内的字符，同时放入数组中。然后遍历字符串`[0, n - 1]` 区间内的字符，同时放入数组中。

```jsx
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    let res = [];
    let idx = 0;
    let length = s.length;
    for (let i = n; i < length; i++) {
        res[idx++] = s[i];
    }
    for (let i = 0; i < n; i++) {
        res[idx++] = s[i];
    }
    return res.join('')
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

分析：

分两次遍历，依次将指定位的字符放入数组中，最后拼接返回即可。同样的，如果题目要求不能使用`join()` ，则使用字符串累加进行拼接。

### 总结

本题考查了字符串的遍历，如果不限制使用API，则一行代码搞定。如果限制使用API，使用字符串的累加来实现新字符串的拼接。