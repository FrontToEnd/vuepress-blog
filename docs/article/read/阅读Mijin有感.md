---
title: 阅读Mijin有感
---

# 阅读Mijin有感

## svg的使用

## display:flow-root

List组件的行内类型会添加`display:flow-root`的css属性。

经查阅资料，该属性的作用为：无论是内联元素，还是原本就是块级元素，在应用`display:flow-root`声明后，都会变成**块级元素**，同时这个元素会建立**新的块级格式上下文**，也就是BFC。

先在`caniuse`上查查兼容性，兼容性如下图(2021-11)：

![display:flow-root](https://img-node.oss-cn-shanghai.aliyuncs.com/images/20211110113720.png)

如果不需要考虑IE浏览器，那么可以在项目中使用。优点在于**清除浮动，以及去除margin合并现象**的同时，不会带来副作用。

## a标签属性

Link组件默认采用了a标签。其中设置了`rel`和`target`属性。

查阅MDN后，记录下这两个属性常用的值：

`rel`属性指定了目标对象到链接对象的关系，该值是空格分隔的**列表类型值**。那么[链接的类型值](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)都有哪些常用的呢？

- external: 表明这个链接，是一个相对于当前网站的外部资源。点击这个链接会离开当前网站。
- next：表明该超链接指向的是当前页面所在序列中的下一个资源。
- **nofollow**：表示本文档的作者不想宣传链接的文档。`nofollow`主要是被一些使用人气排名技术的搜索引擎所使用。
- **noopener**：指示浏览器打开链接而不授予新的浏览上下文对打开它的文档的访问权限。也就是说新打开页面的`window.opener`的值为`null`。打开不受信任的链接时，这特别有用。
- **noreferrer**：阻止浏览器导航到另一个页面时，通过`Referer：HTTP header`将该页面地址或任何其他值作为`Referrer`发送。

`target`属性指定在何处显示链接的资源。 取值为标签（tab），窗口（window），或框架（iframe）等浏览上下文的名称或其他关键词。

- **_self**: 当前页面加载，即当前的响应到同一HTML 4 frame（或HTML5浏览上下文）。此值是默认的，如果没有指定属性的话。
- **_blank**: 新窗口打开，即到一个新的未命名的HTML4窗口或HTML5浏览器上下文。
- _parent: 加载响应到当前框架的HTML4父框架或当前的HTML5浏览上下文的父浏览上下文。如果没有parent框架或者浏览上下文，此选项的行为方式与_self 相同。
- _top: HTML4中：加载的响应成完整的，原来的窗口，取消所有其它frame。

注意：在` <a> `元素上使用 `target="_blank"` 隐式提供了与使用 `rel="noopener"` 相同的 `rel`行为，即不会设置 `window.opener`。

总的来说，如果需要新开一个标签页，直接`<a target="_blank"></a>`就足够了。

## flex的基本概念

Note组件中使用了`flex-none`的样式，这里参考`MDN`文档整理下`flex`的基本概念。

`Flexible Box`模型，通常被称为`flexbox`，是一种一维的布局模型。通过对元素声明`display: flex`来生成一个`flexbox`。

首先，`flexbox`包括**主轴和交叉轴**。主轴由 `flex-direction` 定义，另一根轴垂直于它。`flex-direction`可以设置以下4个值：

- row(默认值)
- row-reverse
- column
- column-reverse

顾名思义，`row`是沿着`inline`方向延伸，`column`是沿着上下方向延伸。

`flexbox`不会对文档的书写模式提供假设。如果是默认的方向，书写的是中文：那么主轴的起始线是左边，终止线是右边。书写的是阿拉伯文，起始线就在右边。这也是为什么`flexbox`的很多属性都是使用的`start`和`end`，而不是左和右。

`flex`容器中的直系子元素就会变为 `flex` 元素。所有CSS属性都会有一个初始值，所以 `flex` 容器中的所有 `flex` 元素都会有下列行为：

- 元素排列为一行 (`flex-direction` 属性的**初始值是 row**)。
- 元素从主轴的起始线开始。
- 元素不会在主维度方向拉伸，但是可以缩小。
- 元素被拉伸来填充交叉轴大小。
- `flex-basis` 属性为 `auto`。
- `flex-wrap` 属性为 `nowrap`。

这也就意味着一些默认的布局行为：元素沿着主轴线性排列，并且把自己的大小作为主轴上的大小。如果有太多元素超出容器，它们会溢出而不会换行。也就是不会在主轴上拉伸，但可以缩小。直到放不下之后溢出（默认不换行）。元素在交叉轴默认是被拉伸（默认值）的，高度由最高的那个元素决定。

可以通过设置`flex-wrap: wrap`来实现多行的容器。

可以将两个属性 `flex-direction` 和 `flex-wrap` 组合为简写属性 `flex-flow`。第一个指定的值为 `flex-direction` ，第二个指定的值为 `flex-wrap`。

有三个属性可以更好的控制`flex`元素：

- flex-grow
- flex-shrink
- flex-basis

这几个 `flex` 属性的作用其实就是改变了 `flex` 容器中的**可用空间**的行为。**可用空间**指的是容器里被元素占用后剩余的空间。下面就来了解下这三个属性。

`flex-basis` 定义了该元素的空间大小，该属性的默认值是 `auto`。意味着自动设置为元素的宽度。如果没有给元素设定尺寸，`flex-basis` 的值采用元素内容的尺寸。所以容器内的元素会自动分配大小以展示内容。

`flex-grow` 若被赋值为一个**正整数**， `flex` 元素会以 `flex-basis` 为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的可用空间（available space）。如果有其他元素也被允许延展，那么他们会各自占据可用空间的一部分。

举个例子，如果对容器内的元素设置`flex-grow: 1`，那么会有如下表现：

所有元素会按比例分配容器内的可用空间，因为都是正整数`1`，因此会进行平分。同时会**延展以填满容器主轴方向上的空间**。

如果容器中没有足够排列`flex`元素的空间，那么可以把`flex`元素`flex-shrink`属性设置为**正整数**来缩小它所占空间到`flex-basis`以下。同样的，可以赋予不同的值来控制`flex`元素收缩的程度。给`flex-shrink`属性赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。

可以通过`flex`属性进行上述三个属性的简写。其中：第一个数值是 `flex-grow`。赋值为正数的话是让元素增加所占空间。第二个数值是`flex-shrink` — 正数可以让它缩小所占空间，但是只有在`flex`元素总和超出主轴才会生效。最后一个数值是`flex-basis`；`flex`元素是在这个基准值的基础上缩放的。

```css
.box {
    display: flex;
}

.one {
    flex: 1 1 auto;
}

```

可以通过预定义的值进一步简写。下面是几种预定义的值：

- flex: initial
- flex: auto
- flex: none
- flex: `<positive-number>`

`flex: initial` 是把`flex`元素重置为`Flexbox`的初始值，它相当于 `flex: 0 1 auto`。

`flex: auto` 等同于 `flex: 1 1 auto`；和上面的 `flex:initial` 基本相同，但是这种情况下，`flex`元素在需要的时候既可以拉伸也可以收缩。

`flex: none` 可以把`flex`元素设置为**不可伸缩**。它和设置为 `flex: 0 0 auto` 是一样的。元素既不能拉伸或者收缩，但是元素会按具有 `flex-basis: auto` 属性的`flexbox`进行布局。

最常用的应该是第四种预定义。`flex: 1`相当于`flex: 1 1 0`。

元素之间对齐主要有两个属性：`justify-content`和`align-items`。

首先是`justify-content`。该属性用来使元素在**主轴方向**上对齐。包括以下几个属性：

- stretch
- **flex-start**（默认值）
- flex-end
- center
- space-around
- space-between

`align-items`属性可以使元素在**交叉轴方向**对齐。包括以下几个属性：

- **stretch**（默认值）
- flex-start
- flex-end
- center
