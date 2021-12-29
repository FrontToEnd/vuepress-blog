# filter和backdrop-filter

## 概念

- `filter`：该属性将模糊或颜色偏移等图形效果应用于元素。
- `backdrop-filter`：该属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。

注意两者之间的差异，`filter` 是作用于元素本身，而 `backdrop-filter` 是作用于元素背后的区域所覆盖的所有元素。

## 差异

`filter` 和 `backdrop-filter` 使用上最明显的差异在于：

- `filter` 作用于当前元素，并且它的后代元素也会继承这个属性
- `backdrop-filter` 作用于元素背后的所有元素

仔细区分理解，一个是**当前元素和它的后代元素**，一个是**元素背后的所有元素**。

## 特性

作用了 `filter` 和 `backdrop-filter` 的元素（值不为 `none`），都会生成 `Backdrop Root`。也就是我们常说的，生成了自己的**堆叠上下文（Stacking Context）**。

结论一：**生成了 Backdrop Root 的元素会使 CSS 3D 失效**。

结论二：作用了 `filter` 和 `backdrop-filter` 的元素会使内部的 `fixed` 定位失效。

默认情况下，CSS 中 `position: fixed` 是相对于**屏幕视口**进行定位的。作用了 `filter` 和 `backdrop-filter` 的元素会使得其内部的 `position: fixed` 元素不再相对于屏幕视口进行定位，而是相对这个 `Backdrop Root` 元素进行定位，其表现就是 `position: fixed` 定位的元素退化为了 `position: absolute`。

在 CSS 中目前一共有 **7** 种方式可以让元素内部的 `position: fixed` 基于该元素定位：

1. `transform` 属性值不为 `none` 的元素
2. 设置了 `transform-style: preserve-3d` 的元素
3. `perspective` 值不为 `none` 的元素
4. 在 `will-change` 中指定了任意 CSS 属性
5. 设置了 `contain: paint`
6. `filter` 值不为 `none` 的元素
7. `backdrop-filter` 值不为 `none` 的元素

## 兼容性

`filter`除IE外，基本都支持。`backdrop-filter` 则一直没得到 `Firefox` 系列的支持（2021-12-29）。

因此如果考虑兼容性，则尽量使用`filter`。
