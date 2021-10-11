# 函数式组件

最近在读一个组件库的源码，[Tailwind CSS UI components build for Vue.js](https://github.com/lecoueyl/mijin)，发现所有的组件都是使用的函数式组件，每个组件都采用了如下方式进行定义：

```html
<template functional>
  <component
    :is="props.tag"
    :ref="data.ref"
    class="inline-flex items-center justify-center overflow-hidden"
    :class="[
      data.class,
      data.staticClass,
    ]"
    :style="[
      data.style,
      data.staticStyle,
    ]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <span
      v-if="props.letter"
      class="leading-none"
    >{{ props.letter }}</span>

    <img
      v-if="props.src"
      :alt="props.alt"
      :src="props.src"
      class="h-full w-full"
    >
    <slot v-if="$slots.default" />
  </component>
</template>
```

可以发现，基本都是从`props`和`data`上面取相应的属性。为什么需要从这两个对象上取属性，函数式组件又有什么其他的特性？接下来就带着疑问来探索一番。

## 定义

根据官网的描述，函数式组件指的是没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。它只是一个接受一些 `prop` 的函数。

将组件标记为 `functional`，这意味它无状态 (没有响应式数据)，也没有实例 (没有 `this` 上下文)。

基于模板的函数式组件可以这样声明：

```html
<template functional>
</template>
```

组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：

- props：提供所有 `prop` 的对象。
- children：`VNode` 子节点的数组。
- slots：一个函数，返回了包含所有插槽的对象。
- scopedSlots：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- data：传递给组件的整个数据对象，作为 `createElement` 的第二个参数传入组件。
- parent：对父组件的引用。
- listeners：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 `data.on` 的一个别名。
- injections：(2.3.0+) 如果使用了 `inject` 选项，则该对象包含了应当被注入的 `property`。

找到了，`props`和`data`分别表示提供所有 `prop` 的对象和传递给组件的整个数据对象。

## 使用

先抛出结论：编写函数式组件时，父组件传递的属性和事件需要通过`v-bind="data.attrs"`和`v-on="listeners"`来获取。

```html
<template functional>
  <h1
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot/>
  </h1>
</template>
```

不幸的是，`class`、`style`和`ref`并不在attrs里包含，我们也需要特殊处理。我们可以使用`data.class / data.staticClass`, `data.style / data.staticStyle` 和 `data.ref`来替换。

可以注意到，有两个属性前面有`static`前缀，这个表示是否为原生的属性，区别如下：

```html
<!-- Goes into `data.class` -->
<YourComponents :class="['my-class']"/>

<!-- Goes into `data.staticClass` -->
<YourComponents class="my-class"/>
```

因此，最终产生的函数式组件如下所示：

```html
<template functional>
  <h1
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot/>
  </h1>
</template>
```

现在再回过头来看下文章开头展示的组件例子，是不是清晰了许多？

## vue2 VS vue3

值得一提的是，文中给出的例子是基于`vue2.x`版本的，`vue3`已经将`functional`的声明方式废弃了。那么为什么要这么做呢？

在 `3.x` 中，有状态组件和函数式组件之间的性能差异已经大大减少，并且在大多数用例中是微不足道的。在单文件组件上使用 `functional` 的开发者的迁移路径是删除该 `attribute`，并将 `props` 的所有引用重命名为 `$props`，以及将 `attrs` 重命名为 `$attrs`。

因此，上述函数式组件可以在`vue3`中重写为：

```html
<template>
  <h1
    :ref="data.ref"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="$attrs"
  >
    <slot/>
  </h1>
</template>
```

主要的区别在于：

1. 从 `<template>` 中移除 `functional` 属性。
2. `listeners` 现在作为 `$attrs` 的一部分传递，可以将其删除。

## 总结

函数式组件只是函数，所以渲染开销也低很多。当不需要额外的状态时，我们可以考虑使用函数式组件。
