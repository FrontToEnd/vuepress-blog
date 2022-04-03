# **剑指Offer题解 - Day38**

## 剑指 Offer 41. 数据流中的中位数

[力扣题目链接](https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/5vd1j2/)

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

设计一个支持以下两种操作的数据结构：

`void addNum(int num)` - 从数据流中添加一个整数到数据结构中。
`double findMedian()` - 返回目前所有元素的中位数。

示例 1：

```jsx
输入：
["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]
[[],[1],[2],[],[3],[]]
输出：[null,null,null,1.50000,null,2.00000]
```

**限制：**

- 最多会对 `addNum、findMedian` 进行 `50000` 次调用。

思路：

首先考虑暴力破解本题。因为要求出数据流中的中位数。笨办法就是直接对数组进行排序，然后求有序数组的中位数即可。

### 暴力法

```jsx
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
    this.numList = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    this.numList.push(num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    this.numList = this.numList.sort((a, b) => a - b);
    let length = this.numList.length;
    if (length % 2 !== 0) {
        return this.numList[Math.floor(length / 2)]
    } else {
        return (this.numList[(length / 2) - 1] + this.numList[length / 2]) / 2
    }
};
```

分析：

此方法可以通过代码提交。但是执行时间至少需要4秒钟，这个时间是无法接受的。由于每次查找中位数的时候，都需要将数组进行排序，这样做效率会非常的低效。因此面试中不要使用该方法进行题解，作为思路了解即可。

### 堆

如果说，我们可以在数组插入数据的时候，动态的将数组分为两个部分并进行排序。然后分别获取两部分的根节点。这样求中位数的时候，可以直接在常数时间内获取到。

堆排序就刚好符合要求。这里我们采用堆进行求解。我们需要实现**大顶堆**和**小顶堆**。两个堆各保存一半元素，同时规定：

- 小顶堆保存较大的一半，长度是N / 2 (N是偶数)或者 (N + 1) / 2 (N是奇数)
- 大顶堆保存较小的一半，长度是N / 2 (N是偶数)或者 (N - 1) / 2 (N是奇数)

这样一来，两个堆顶分别保存着最大值中的最小值，和最小值中的最大值。中位数就可以通过堆顶元素计算得到。

当添加元素的时候，也就是调用`addNum`时候，需要做如下处理：

- 当N为偶数时，也就意味着大顶堆和小顶堆元素数量相等。此时需要在小顶堆中添加一个元素。但是不能直接添加，因为不能确保待添加的元素比大顶堆中的元素大。所以需要先将元素添加至大顶堆，等待大顶堆堆化以后，取出大顶堆的堆顶元素，然后添加至小顶堆。
- 当N为奇数时，意味着小顶堆的元素比大顶堆元素多出一个。此时需要在大顶堆中添加一个元素。同理，不能直接添加。需要先将元素添加至小顶堆，等待小顶堆堆化以后，取出小顶堆的堆顶元素，然后添加至大顶堆。

然后是`findMedian`的逻辑。需要做如下处理：

- 当N为偶数时，中位数是(大顶堆的堆顶元素 + 小顶堆的堆顶元素) / 2。
- 当N为奇数时，中位数是小顶堆的堆顶元素。

上面是整个流程的代码逻辑。此时还差一步，那就是实现大顶堆和小顶堆。由于`JavaScript`没有提供原生实现，因此需要自己来实现。

本题创建大顶堆和小顶堆的代码参考自[力扣题解](https://leetcode-cn.com/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/solution/zui-da-dui-zui-xiao-dui-javascript-by-lz-907k/)。

```jsx
const MedianFinder = function () {
    // 默认大顶堆
    const defaultCmp = (x, y) => x > y;
    // 交换元素
    const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);
    // 堆类，默认最大堆
    class Heap {
        constructor(cmp = defaultCmp) {
            this.container = [];
            this.cmp = cmp;
        }
        // 向堆中添加元素
        insert(data) {
            const { container, cmp } = this;
            container.push(data);
            let index = this.size() - 1;
            while (index) {
                let parent = (index - 1) >> 1;
                if (!cmp(container[index], container[parent])) {
                    return;
                }
                swap(container, index, parent);
                index = parent;
            }
        }
        // 弹出堆顶，并返回
        pop() {
            const { container, cmp } = this;
            if (!this.size()) {
                return null;
            }
            swap(container, 0, this.size() - 1);
            const res = container.pop();
            const length = this.size();
            let index = 0,
                exchange = index * 2 + 1;
            while (exchange < length) {
                // // 以最大堆的情况来说：如果有右节点，并且右节点的值大于左节点的值
                let right = index * 2 + 2;
                if (right < length && cmp(container[right], container[exchange])) {
                    exchange = right;
                }
                if (!cmp(container[exchange], container[index])) {
                    break;
                }
                swap(container, exchange, index);
                index = exchange;
                exchange = index * 2 + 1;
            }
            return res;
        }
        // 获取堆大小
        size() {
            return this.container.length;
        }
        // 获取堆顶
        peek() {
            if (this.size()) return this.container[0];
            return null;
        }
    }
    // 大顶堆
    this.A = new Heap();
    // 小顶堆
    this.B = new Heap((x, y) => x < y);
};
MedianFinder.prototype.addNum = function (num) {
    if (this.A.size() !== this.B.size()) {
        // 当N为奇数，需要向B添加一个元素
        // 先将num插入A，再将A堆顶弹出，插入B
        this.A.insert(num);
        this.B.insert(this.A.pop());
    } else {
        // 当N为偶数，需要向A添加一个元素
        // 先将num插入B，再将B堆顶弹出，插入A
        this.B.insert(num);
        this.A.insert(this.B.pop());
    }
};
MedianFinder.prototype.findMedian = function () {
    // 若总和为偶数，返回两个堆顶的平均数
    // 若总和为奇数，返回A的堆顶
    return this.A.size() !== this.B.size()
        ? this.A.peek()
        : (this.A.peek() + this.B.peek()) / 2;
};
```

- **时间复杂度：查找中位数O(1)**。**添加数字O(logN)。**
- **空间复杂度 *O*(N)**。

分析：

上面已经详细分析了建完大顶堆和小顶堆后的代码逻辑与思路，那么现在就具体分析一下建堆的过程。

堆的相关概念参考[前端进阶算法](https://github.com/sisterAn/JavaScript-Algorithms/issues/60)。

首先介绍下堆的定义，满足下面两个条件的就是堆：

- 堆是一个 **完全二叉树**
- 堆上的任意节点值都必须大于等于（**大顶堆**）或小于等于（**小顶堆**）其左右子节点值

如果堆上的任意节点都大于等于子节点值，则称为 **大顶堆**

如果堆上的任意节点都小于等于子节点值，则称为 **小顶堆**

由于堆是完全二叉树，而完全二叉树可以使用数组存储，所以对于堆我们也使用数组来存储。

简单来说： **堆其实可以用一个数组表示，给定一个节点的下标 `i` （i从1开始） ，那么它的父节点一定为 `A[i/2]` ，左子节点为 `A[2i]` ，右子节点为 `A[2i+1]`**

创建大小顶堆有两种方式：

- 插入式创建：每次插入一个节点，实现一个大顶堆（或小顶堆）
- 原地创建：又称堆化，给定一组节点，实现一个大顶堆（或小顶堆）

插入式建堆的步骤如下：

- 将节点插入到队尾
- **自下往上堆化：** 将插入节点与其父节点比较，如果插入节点大于父节点（大顶堆）或插入节点小于父节点（小顶堆），则插入节点与父节点调整位置
- 一直重复上一步，直到不需要交换或交换到根节点，此时插入完成。

原地建堆的步骤如下：

- **自下而上式堆化** ：将节点与其父节点比较，如果节点大于父节点（大顶堆）或节点小于父节点（小顶堆），则节点与父节点调整位置
- **自上往下式堆化** ：将节点与其左右子节点比较，如果存在左右子节点大于该节点（大顶堆）或小于该节点（小顶堆），则将子节点的最大值（大顶堆）或最小值（小顶堆）与之交换

可以看出，本题采用的是插入式的建堆。

### 总结

本题考查大顶堆和小顶堆相关算法。由于前端没有堆的原生实现，因此需要通过数组来存储一个堆。复杂度方面，添加节点类似于二分法，因此时间复杂度是`O(logN)` 。需要存储所有的节点，所以空间复杂度是`O(N)` 。
