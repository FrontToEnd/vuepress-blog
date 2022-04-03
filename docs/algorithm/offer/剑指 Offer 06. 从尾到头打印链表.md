# 剑指Offer题解-Day2

## **剑指 Offer 06. 从尾到头打印链表**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5dt66m/)

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

```
示例 1：

输入：head = [1,3,2]
输出：[2,3,1]
```

限制：

1. 0 <= 链表长度 <= 10000

思路：

尝试使用暴力法进行破解。

### 暴力法

```jsx
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    let stack = []; // 初始化一个数组，用来存放链表的值
    while(head) { // 循环终止条件是链表为空
        stack.push(head.val) // 将链表的值放入数组中
        head = head.next; // 将指针指向下一个链表节点
    }
    return stack.reverse(); // 将数组倒序后返回
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

解析：我们先正序遍历链表，同时将链表的值存入数组中。直到链表为空则停止遍历。最后将数组进行倒置后返回，则是最终结果。

### 辅助栈法

首先，链表的特点是**从前到后**依次访问节点，而题目的要求是**倒序输出**节点，考虑使用后进先出的辅助栈进行解题。

思路：依次将链表节点放入辅助栈(数组)中。然后将辅助栈的元素依次弹出并存入数组后返回。

```jsx
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
    let stack = []; // 辅助栈
    let result = []; // 初始化待返回的数组
    while(head) { // 依次将链表元素存入辅助栈
        stack.push(head.val)
        head = head.next;
    }
    while(stack.length) {
        result.push(stack.pop()) // 依次将辅助栈内的元素弹出并存入结果数组中
    }
    return result; // 最后返回结果数组
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

### 总结

暴力法和辅助栈法的区别是一个使用数组的API进行元素倒置，一个使用辅助栈进行元素倒置。面试中应该尽量使用辅助栈的思路进行题解，暴力法不能体现出栈的特点。

## **剑指 Offer 24. 反转链表**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/9pdjbm/)

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

```jsx
示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

限制：

`0 <= 节点个数 <= 5000`

思路：

翻转链表是一个很经典的算法题，首先考虑使用遍历链表，然后维护额外的指针进行`next`的转变，从而达到翻转链表的目的。

### 迭代法

```jsx
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let cur = head; // cur指针指向链表头部
    let pre = null; // pre指针指向链表尾部
    let temp = null; // 初始化临时存储变量
    while(cur) { // 遍历链表
        temp = cur.next; // 首先将当前节点的next指针存储，方便cur指针的前移
        cur.next = pre; // 将当前节点的next指针指向前面的节点
        pre = cur; // 将前面的节点后移一位到当前节点
        cur = temp; // 将当前节点后移一位到next指针指向的节点
    }
    return pre; // 链表反转完成后，pre指针指向的就是头部节点，返回即可
};
```

- 时间复杂度：O(n)。
- 空间复杂度：O(1)。

解析：通过引入临时变量和`pre`变量，达到了改变`next`指向的效果。临时变量也在交换变量时进行使用，此处同理。核心思路就是先暂存当前节点的`next` 指向，然后改变`next`指向为`pre`，然后将`pre`和`cur`后移一位。

### 递归

本题也可以使用递归进行处理，通过回溯来修改`next`指向。

使用递归进行解题，一定要写递归的终止条件，否则会造成死循环导致内存溢出。

```jsx
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

//递归函数
const recur = (cur, pre) => {
    if (cur === null) return pre; // 递归终止条件
    let res = recur(cur.next, cur); // 递归后继节点
    cur.next = pre; // 将pre节点指向当前节点的next
    return res; // 返回反转链表的头节点
} 
var reverseList = function(head) {
    return recur(head, null); // 调用递归，最后返回反转链表的头节点
};
```

- 时间复杂度：O(n)。
- 空间复杂度：O(n)。

### 总结

相较于递归，迭代法更容易理解。此处优先掌握迭代法进行题解。而递归更考验逻辑思维，通过后续的题解我们慢慢加强。