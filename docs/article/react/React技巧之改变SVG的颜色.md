# React技巧之改变SVG的颜色

原文链接：[https://bobbyhadz.com/blog/react-change-color-of-svg](https://bobbyhadz.com/blog/react-change-color-of-svg)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，改变SVG的颜色：

1. 不要在SVG上设置`fill`和`stroke`属性。
2. 将SVG作为组件导入。
3. 在组件上设置`fill`和`stroke`属性，比如说，`<MyLogo fill="black" stroke="yellow" />` 。

```jsx
import {ReactComponent as MyLogo} from './my-logo.svg';

export default function App() {
  return (
    <div>
      <MyLogo fill="black" stroke="yellow" />
    </div>
  );
}
```

这里是示例中`svg`的代码。

```jsx
<svg width="400" height="400">
  <circle cx="100" cy="100" r="50" stroke-width="5" />
</svg>
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/067db06518b34b6f8321238f7c5f208b~tplv-k3u1fbpfcp-watermark.image?)

需要注意的是，我们没有在`svg`元素上设置`fill`和`stroke`属性。这两个属性如果没有在`svg`中定义，那么只有在通过设置组件属性时才会应用。

> `fill`属性用来设置对象内部的颜色，`stroke` 属性用来设置对象周围线条的颜色。
> 

另外，你可以把你的SVG粘贴到一个组件中，并把颜色作为属性传递。

```jsx
function MyLogo({fill, stroke}) {
  // 👇️ paste SVG into a component
  // take fill and stroke colors as props
  return (
    <svg fill={fill} stroke={stroke} width="400" height="400">
      <circle cx="100" cy="100" r="50" stroke-width="5" />
    </svg>
  );
}

export default function App() {
  return (
    <div>
      <MyLogo fill="black" stroke="yellow" />
    </div>
  );
}
```

上面的代码达到了同样的效果，但我们直接将SVG存储在一个组件中，而不是从一个扩展名为`svg`的文件中导入。

需要注意的是，MyLogo组件接收`fill`和`stroke`的值作为属性，并将它们应用到`svg`元素中。

如果你没有一个允许你将SVG导入组件的`loader`，这应该是你的首选方法。