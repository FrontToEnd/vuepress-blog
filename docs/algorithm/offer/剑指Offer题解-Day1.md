# 剑指Offer题解 - Day1

## **剑指 Offer 09. 用两个栈实现队列**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5d3i87/)

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

示例 1：

```jsx
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```

示例 2：

```jsx
输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```

提示：

- 1 <= values <= 10000
- 最多会对 appendTail、deleteHead 进行 10000 次调用

思路：

首先需要明确栈的特点是**后进先出**；队列的特点是**先进先出**。

如果需要使用两个栈实现队列，那么栈`A`用来入栈元素充当队列的队尾插入元素；栈`B`将栈`A`的元素倒序后放入，弹出栈顶元素充当队列的队头弹出元素。

举个🌰：假如栈`A` 依次插入元素`[1,2]` ，此时先入栈的是`1`；将栈`A`元素倒序后放入栈`B`，此时栈`B`元素是`[2,1]` 。然后弹出栈`B`元素，该元素也是`1`。这样就达到了先进先出的效果。

```jsx
var CQueue = function() {
    this.stackA = []; // 初始化两个栈(数组)
    this.stackB = [];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
	this.stackA.push(value) // 入队操作就是将元素放入栈A
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() { // 删除队头元素分为三种情况
	if (this.stackB.length) return this.stackB.pop(); // 栈B有元素，则直接返回栈顶元素
	if (!this.stackA.length) return -1; // 栈B没有元素，且栈A没有元素，返回-1
	while(this.stackA.length) { // 将栈A元素倒序排列并放入栈B中，目的是为了弹出栈B的栈顶元素
		this.stackB.push(this.stackA.pop())
	}
	return this.stackB.pop(); // 弹出栈顶元素并返回
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

- 时间复杂度：`appendTail`为`O(1)`；`deleteHead`为`O(n)` 。
- 空间复杂度：`O(n)` 。

## 总结

本题考查栈和队列的特点。

## **剑指 Offer 30. 包含 min 函数的栈**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/50bp33/)

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

示例:

```jsx
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

提示：

1. 各函数的调用总次数不超过 20000 次。

思路：

`push`和`pop`方法都可以使用数组的API直接实现，并且时间复杂度都是`O(1)` 。难点在于找到栈中的最小元素。如果遍历整个栈，那么时间复杂度是`O(n)` 。不符合题目要求。

此时需要额外维护栈`B`，用来存放栈`A`元素的非严格降序。那么最终栈B的栈顶元素就是最小元素。

```jsx
/**
 * initialize your data structure here.
 */
var MinStack = function() {
	this.stackA = []; // 栈A用来执行pop和push
	this.stackB = []; // 栈B用来存放栈A元素的非严格降序
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
	this.stackA.push(x); // 直接存入栈A的栈顶
	const length = this.stackB.length; // 缓存长度
	if(!length || x <= this.stackB[length - 1]) { // 如果栈B为空，或者插入的元素小于等于栈B的栈顶元素
		this.stackB.push(x); // 则将元素插入到栈B的栈顶，如此可以确保栈顶元素永远最小
	}
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {

	// 当栈A弹出的元素等于栈B栈顶的元素时
	if (this.stackA.pop() === this.stackB[this.stackB.length - 1]) {
		this.stackB.pop() // 将栈B栈顶元素弹出，这样可以维护两个栈的一致性
	}
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
	return this.stackA[this.stackA.length - 1] || null  // 返回栈A的栈顶元素
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
	return this.stackB[this.stackB.length - 1] || null // 返回栈B的栈顶元素，则为栈A的最小元素
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```

- 时间复杂度：O(1)。
- 空间复杂度：O(n)。

## 总结

两道题都使用了辅助栈进行保存额外的信息。当遇到使用栈实现队列、常数时间返回栈内的极值时，就要想到使用辅助栈来实现。