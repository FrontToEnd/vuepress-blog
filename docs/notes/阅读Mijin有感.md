---
title: 阅读Mijin有感
---

# 阅读Mijin有感

[Mijin](https://lecoueyl.github.io/mijin.web/)是一个基于`vue`的UI组件，组件所有的样式都是通过`tailwindcss`来声明，并且都是函数式组件。

本文就是通读组件源码后，发现一些有意思的知识点，记录在册。

## svg的使用

组件中大量使用了`svg`，用来绘制一些简单的图案。以圆形加载进度条为例进行说明。

首先来看圆形加载进度条是如何实现的：

```html
<svg
    class="transform -rotate-90"
    viewBox="0 0 100 100"
>
    <circle
        class="text-gray-200 dark:text-gray-700"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="8"
        fill="none"
        cx="50"
        cy="50"
        r="40"
    />
    <circle
        :class="{
            'text-primary-500': color === 'primary',
            'text-success-500': color === 'success',
            'text-danger-500': color === 'danger',
            'text-warning-500': color === 'warning',
        }"
        :style="{ strokeDasharray: `${circleProgress} 252` }"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-width="8"
        fill="none"
        cx="50"
        cy="50"
        r="40"
    />
</svg>
```

看完例子发现看不懂？不要紧，下面进行详细解释。

先来看看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG)上对于`svg`的定义：

**可缩放矢量图形**（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形，基于 `XML` 的标记语言。和传统的点阵图像模式，像`JPEG`和`PNG`不同，`SVG`格式提供的是矢量图，这意味着它的图像能够被无限放大而不失真或降低质量，并且可以方便地修改内容。

`svg`的内容实在太多了，无法一一进行说明。就以例子中出现的属性来具体说明。

`svg`标签上的属性`viewBox`属性允许指定一个给定的一组图形伸展以适应特定的容器元素。`viewBox`属性的值是一个包含4个参数的列表`min-x, min-y, width, height`， 以空格或者逗号分隔开， 在用户空间中指定一个矩形区域映射到给定的元素。也就是说，该属性用来声明这个`svg`的大小。

`svg`上基本形状元素包括`<circle>, <ellipse>, <line>, <polygon>, <polyline>, <rect>`，分别表示圆、椭圆、线条、一组首尾相连的直线线段构成的闭合多边形形状、一系列直线连接多个点（不闭合形状）、矩形。

先来介绍`<circle>`。用来创建圆,基于一个圆心和一个半径。属性包括**全局属性**和**专有属性**。

**专有属性**分别是：`cx、cy、r`。`cx`属性定义一个中心点的`x`轴坐标。`cy`属性定义一个中心点的`y`轴坐标。`r`属性用来定义圆的半径。

这里引申出`svg`的坐标系统：以页面的左上角为`(0,0)`坐标点，坐标以像素为单位，`x`轴正方向是向右，`y`轴正方向是向下。因此上述例子中圆的圆心位于画布的最中心`(50,50)`。圆的半径是40像素。

我们继续看`<circle>`上的其他属性。

`stroke`属性定义了给定图形元素的外轮廓的颜色。它的默认值是`none`。例子中该属性的值是`currentColor`。`currentColor`是`css`的关键字，含义是与当前元素字体颜色保持一致。

`stroke-linejoin` 属性指明路径的转角处使用的形状或者绘制的基础形状。默认值是`miter`。可能具有的值包括：`arcs | bevel |miter | miter-clip | round`。`arcs`值指示将使用圆弧拐角来连接路径线段。`bevel`用斜角连接路径段。`miter` 用尖角连接路径段。`miter-clip`用尖角连接路径段。`round`使用圆角连接路径片段。这里比较抽象，可以查看[MDN中stroke-linejoin](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-linejoin)的实例来理解。

`stroke-linecap`属性制定了，在开放子路径被设置描边的情况下，用于开放自路径两端的形状。属性值包括`butt | round | square | inherit`。这里设置的是`round`，效果就是两端的形状类似于圆角。

`stroke-width`属性指定了当前对象的轮廓的宽度。它的默认值是1。如果使用了0值，则将不绘制轮廓。

对于形状元素和文本，`fill`属性是外观属性，用来定义给定图形元素内部的颜色。哪一块算是“内部”取决于形状本身以及`fill-rule`属性的值。这里的内部就是圆形的内部，颜色不设置。

最关键的属性就是`stroke-dasharray`。动态修改属性就可以达到不同百分比的效果。该属性可以控制用来描边的点划线的图案范式。它是一个`<length>`和`<percentage>`数列，数与数之间用逗号或者空白隔开，指定短划线和缺口的长度。例子中属性值是两个值，分别代表短划线和缺口，缺口的值是`252`，短划线的长短就表示着具体的进度。将`circleProgress`变量平分100份，每一份就是1%的进度。

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

## 零宽字符

在骨架组件中，使用了`&#8203;`来填充`div`元素。经查，该字符表示零宽字符。通过如下方式获取长度，则为1。

```html
<div id='zero'>&#8203;</div>

<script>
    const length = document.getElementById('zero').innerText.length; // 1
</script>
```

维基百科的解释为：**零宽空格**（zero-width space, ZWSP）是一种不可打印的`Unicode`字符，用于可能需要换行处。

其中，`unicode`码为`U+200B`，HTML编码后为`&#8203;`，CSS编码后为`\200B`，url编码后为`%E2%80%8B`。

在组件中添加零宽字符，用来填充空标签。

## 编码与解码

接上个话题，在学习通过`XSS`绕过和注入的时候，会遇到编码和解码顺序的问题，这里进行总结。

编码包括**url编码、HTML编码和js编码**。

**url编码**，它以一个百分号%和该字符的`ASCII`对应的2位十六进制数去替换这些字符，如常见的空格编码为%20，百分号%编码为%25。

**HTML编码**，以连接符`&`开头以分号`;`结尾。中间字符包括：英文字符、`#`后接十进制数或`#x`后接十六进制数。比如：`&lt;`。

**JS编码**，通过反斜杠来处理编码。具体为：

- `\b`退格符，`\t`制表符，`\v`垂直制表符等；
- 三位数字，不足位数用0补充，按8位原字符八进制字符编码；
- 两位数字，不足位数用0补充，按8位原字符16进制字符编码，前缀`x`；
- 四位数字，不足为数用0补充，按16位原字符16进制`Unicode`数值编码，前缀u。

比如：`\145、\x65和\u0065`都代表字符`e`。

浏览器的解析顺序是怎样的呢？ 这里详见浏览器原理，此处不表。

那么给定一串字符，浏览器是怎么**解码**呢？注意浏览器的**解码顺序**和**解析顺序**是两码事。

**浏览器一般的解码顺序是先进行html解码，再进行javascript解码，最后再进行url解码**。需要注意的是这里的url解码和我们发送到服务器的url解码不同，那个过程是由服务器来完成的，而不是浏览器。

## 设置placeholder字体颜色

`tailwindcss`中有对placeholder字体颜色进行设置的样式，来看看样式具体怎么写的。

以`placeholder-gray-400`样式为例：

```css
.placeholder-gray-400::placeholder {
    --tw-placeholder-opacity: 1;
    color: rgba(161, 161, 170, var(--tw-placeholder-opacity));
}
.placeholder-gray-400::-webkit-input-placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(161, 161, 170, var(--tw-placeholder-opacity));
}
.placeholder-gray-400::-moz-placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(161, 161, 170, var(--tw-placeholder-opacity));
}
.placeholder-gray-400:-ms-input-placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(161, 161, 170, var(--tw-placeholder-opacity));
}
.placeholder-gray-400::-ms-input-placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(161, 161, 170, var(--tw-placeholder-opacity));
}
.placeholder-gray-400::placeholder {
  --tw-placeholder-opacity: 1;
  color: rgba(161, 161, 170, var(--tw-placeholder-opacity));
}
```

## appearance

`appearance`属性用于根据用户操作系统的主题使用平台原生样式来显示元素。

`appearance: none;`表示**不应用任何特殊样式**。这是未定义元素的默认值。这么设置的原因是因为不同的操作系统会有不同的原生样式，如此设置来将样式进行统一，不展示原生样式。

该属性具体的解释可以参考[这篇文章](https://css-tricks.com/almanac/properties/a/appearance/)。
