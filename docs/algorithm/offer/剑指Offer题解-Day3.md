# 剑指Offer题解-Day3

## **剑指 Offer 35. 复杂链表的复制**

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/9p0yy1/)

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 `next` 指针指向下一个节点，还有一个 `random` 指针指向链表中的任意节点或者 `null`。

示例1：

```jsx
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

示例2：

```jsx
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
```

示例3：

```jsx
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

示例4：

```jsx
输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
```

**提示：**

- `10000 <= Node.val <= 10000`
- `Node.random` 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

思路：

如果不考虑 `random` 指针的话，对一条链表进行拷贝，我们只需要使用两个指针：一个用于遍历原链表，一个用于构造新链表（始终指向新链表的尾部）即可。这里涉及到额外的`random`指针，因此需要将`random`指针指向的节点存储起来。

首先考虑到的是，通过遍历链表，将原链表的节点和新链表所对应的节点一一对应起来。当再一次遍历链表时，取出相应的`random`指向的节点，更新`random`指向的引用，并返回。

### **哈希表**

利用哈希表的查询特点，考虑构建 **原链表节点** 和 **新链表对应节点** 的键值对映射关系，再遍历构建新链表各节点的 `next` 和 `random` 引用指向即可。

在前端中，哈希表可以使用`Map`来实现。

```jsx
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null; // 如果头结点不存在直接返回null
    let cur = head; // 将头部节点指向cur节点
    let map = new Map(); // 构造哈希表存储键值对应关系
    while(cur) { // 遍历链表
        map.set(cur, new Node(cur.val)); // 记录原节点和新节点的映射关系
        cur = cur.next;
    }
    cur = head; // 重置cur节点
    while(cur) { // 再次遍历链表，用于更新next和random的指向
        map.get(cur).next = cur.next ? map.get(cur.next) : null; // 需要处理next和random为null的情况
        map.get(cur).random = cur.random ? map.get(cur.random) : null;
        cur = cur.next;
    }
    return map.get(head); // 返回新链表的头部节点
};
```

- 空间复杂度：O(n)。
- 时间复杂度：O(n)。

**思路分析**：

先不考虑`random`节点，通过重新构造`node`节点达到复制的目的。然后再次遍历链表，更新`next`和`random`的指向。

### **拼接 + 拆分**

构建原节点1  → 新节点1 → 原节点2 → 新节点2的拼接节点，这样访问原节点`random`节点的同时，也可以找到新节点的`random`节点。核心思路是`cur.next.random = cur.random.next` 。

```jsx
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
	if (!head) return null;
	let cur = head;
	while(cur) {
		let temp = new Node(cur.val); // 复制各个节点
		temp.next = cur.next; // 构造拼接节点，将temp插入cur的下一个节点
		cur.next = temp;
		cur = temp.next;
	}
	cur = head; // 重置cur节点
	while(cur) {
		if (cur.random) {
			cur.next.random = cur.random.next; // 构建新节点的random指向
		}
		cur = cur.next.next; // 指向下一个原节点
	}
	cur = head.next; // 指向新链表头部节点
	let pre = head; // 指向原链表头部节点
	let res = head.next; // 缓存新链表头部节点
	while(cur.next) { // 跳表指向，因此需要判断cur.next是否存在
		pre.next = pre.next.next; // 将原链表与新链表进行拆分
		cur.next = cur.next.next;
		pre = pre.next;
		cur = cur.next;
	}
	pre.next = null; // 单独处理原链表尾节点
	return res; // 返回新链表头部节点
```

- 空间复杂度：O(1)。
- 时间复杂度：O(n)。

思路分析：

首先将原链表与新链表进行拼接，然后构建新节点的`random` 指向，最后将原链表与新链表进行拆分，最后返回新链表头部节点。而`cur.next.random = cur.random.next` 就是用来指向新节点的`random`指向。原理是原节点的随机节点的下一个节点(新节点)就是原节点下一个节点(新节点)的随机节点。毕竟是原→新→原→新。

### 总结

复杂链表的复制，考查的是如何复制一个链表，同时正确指向`random`节点。如果是普通链表的复制，那么上面题解出去除有关`random`的部分便是最终的题解。