# **剑指Offer题解 - Day61**

## 剑指 Offer 59 - II. 队列的最大值

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/e2t5ug/)

请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。

若队列为空，pop_front 和 max_value 需要返回 -1

示例 1：

```jsx
输入:
["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
[[],[1],[2],[],[],[]]
输出: [null,null,null,2,1,2]
```

示例 2：

```jsx
输入:
["MaxQueue","pop_front","max_value"]
[[],[],[]]
输出: [null,-1,-1]
```

**限制：**

- `1 <= push_back,pop_front,max_value的总操作数 <= 10000`
- `1 <= value <= 10^5`

思路：

既然题目要求时间复杂度均为`O(1)` ，因此本题适合采用空间换时间的思路进行题解。

与昨天的题目类似，本题需要维护一个辅助队列来存放当前队列中的最大值。

```jsx
var MaxQueue = function() {
    this.queue = []; // 初始化结果队列
    this.temp = []; // 初始化辅助队列
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    if (!this.queue.length) return -1; // 队列为空返回-1
    return this.temp[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
    this.queue.push(value);
    while(this.temp.length && this.temp[this.temp.length - 1] < value) {
        this.temp.pop();
    }
    this.temp.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if (!this.queue.length) return -1;  // 队列为空返回-1
    if (this.queue[0] === this.temp[0]) { // 同步更新队列和辅助队列的队头
        this.temp.shift();
    }
    return this.queue.shift();
};
```

- **时间复杂度 *O*(1)**。
- **空间复杂度 *O*(n)**。

分析：

辅助队列的核心是要确保是单调递减的。因为当队列中的最大元素被弹出后，需要更新辅助队列的队头为第二大元素，可以理解为老二上位顶替了老大的位置。

因此，当获取队列中的最大值时，直接返回辅助队列的队头或者-1即可。

当向队列尾部添加元素时，需要判断当前元素和辅助队列尾部元素的关系，如果大于队列尾部元素，那么就需要保证辅助队列是单调递减的，此时要弹出辅助队列尾部的较小元素，直到辅助队列中元素递减为止。然后再将当前元素追加到辅助队列中。

当弹出队列头部元素时，如果队列为空则返回-1。如果队头元素等于辅助队列的队头元素，需要同时弹出队列和辅助队列的队头元素。

### 分析

由于原生JS中没有队列的数据结构，因此这里采用数组进行模拟。但是弹出数组的头部元素，会使得数组中其他元素全部往前移动一位，这样下来其实平均时间复杂度就不是`O(1)` 。

但这里是进行队列模拟，所以暂且认为入队和出队的时间复杂度均为`O(1)` 。我们要维护一个辅助队列，最差情况需要存储n个元素，因此空间复杂度是`O(n)` 。
