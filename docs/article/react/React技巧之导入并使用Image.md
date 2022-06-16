# React技巧之导入并使用Image

原文链接：[https://bobbyhadz.com/blog/react-import-image](https://bobbyhadz.com/blog/react-import-image)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React组件中导入并使用`image`：

1. 导入本地图片，比如说，`import MyImage from './thumbnail.webp';` 。
2. 将导入的图片传递给`img`元素的`src`属性。
3. 比如说，`<img src={MyImage} alt="horse" />` 。

```jsx
// 👇️ import the image
import MyImage from './thumbnail.webp';

export default function App() {
  return (
    <div>
      {/* 👇️ local image */}
      <img src={MyImage} alt="horse" />

      {/* 👇️ external image */}
      <img
        src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
        alt="car"
      />
    </div>
  );
}
```

![react-import-image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83a4871a6519473594426fc60d4e4c8a~tplv-k3u1fbpfcp-watermark.image?)

## 导入

我们使用ES6默认导入在React应用中导入图片。`alt`属性帮助屏幕阅读器来理解当前图片是关于什么的。

需要注意的是，`img`元素是自闭合标签 - `<img />` 。

上面的例子假设你有一个名为`thumbnail.webp`的图片，和`App`组件位于同一文件夹下。

> 请确保为图片指定了正确的路径（包括扩展名）。
> 

举例来说，如果要从上层目录导入一个图片，应该这么导入：`import MyImage from '../thumbnail.webp'` 。图片须位于项目的`src`目录中。

> 通常情况下，最好将图篇放在使用它们的组件旁边，以确保在你最终删除或改变组件时不会有多余的图片。
> 

你可以使用该方法在React应用中导入并使用`png`, `svg`, `webp`, `jpg` 等图片。

```jsx
// 👇️ import SVG image
import MyImage from './logo.svg';

export default function App() {
  return (
    <div>
      {/* 👇️ local image */}
      <img src={MyImage} alt="logo" />

      {/* 👇️ external image */}
      <img
        src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
        alt="car"
      />
    </div>
  );
}
```

## public目录

如果图片位于`public`目录，当在`img`元素上设置`src`属性时，请使用图片的绝对路径。

比如说，如果有一张图片位于`public/images/thumbnail.webp` ，你应该设置`src`属性为`"/images/thumbnail.webp"` 。

```jsx
export default function App() {
  return (
    <div>
      {/* 👇️ local image */}
      <img src="/images/thumbnail.webp" alt="horse" />

      {/* 👇️ external image */}
      <img
        src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
        alt="car"
      />
    </div>
  );
}
```

![react-use-image-from-public-directory.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59788aa09e614bd1a14991e720e6a9bd~tplv-k3u1fbpfcp-watermark.image?)

## require

如果你的设置中不能使用ES6的导入/导出语法，可以尝试使用`require()`。

```jsx
export default function App() {
  return (
    <div>
      {/* 👇️ local image */}
      <img src={require('./thumbnail.webp')} alt="horse" />
      <img src={require('./logo.svg').default} alt="horse" />
    </div>
  );
}
```

上面的例子使用了`require()` 语法来导入两张图片，该图片位于和`App`组件相同的路径中。

## 外部URL

如果你需要显示一个来自外部URL的图片，请将`img`标签上的`src`属性设置为图片的完整URL。

```jsx
export default function App() {
  return (
    <div>
      <img
        src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
        alt="car"
      />
    </div>
  );
}
```

上面的例子向我们展示了如何显示来自外部URL的图片。我们使用了`img`标签，并将它的`src`属性设置为指向图片的完整URL。