# React技巧之获取鼠标坐标位置

原文链接：[https://bobbyhadz.com/blog/react-get-mouse-position](https://bobbyhadz.com/blog/react-get-mouse-position)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中获得鼠标位置：

1. 在元素上设置`onMouseMove`属性，或者在`window`对象上添加事件监听器。
2. 提供事件处理函数。
3. 在`event`对象上访问相关属性。

```jsx
import {useEffect, useState} from 'react';

export default function App() {
  const [coords, setCoords] = useState({x: 0, y: 0});

  const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});

  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const handleMouseMove = event => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

  return (
    <div>
      {/* 👇️ Get mouse coordinates relative to element */}
      <div
        onMouseMove={handleMouseMove}
        style={{padding: '3rem', backgroundColor: 'lightgray'}}
      >
        <h2>
          Coords: {coords.x} {coords.y}
        </h2>
      </div>

      <hr />

      <h2>
        Global coords: {globalCoords.x} {globalCoords.y}
      </h2>
    </div>
  );
}
```

![react-get-mouse-position.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fff5985e57c745d5be1c50297d7a7e31~tplv-k3u1fbpfcp-watermark.image?)

## 鼠标移动事件

上面代码向我们展示了，如何在`div`元素或者`window`对象上处理`mousemove`事件。

当鼠标指针的热点在一个元素内时，用户的鼠标被移动，`mousemove`事件就会在该元素上触发。

为了得到相对于页面上某个元素的鼠标坐标，我们必须从`clientX`减去`offsetLeft`，从`clientY`减去`offsetTop`。

```jsx
// 👇️ get mouse coords relative to the an element
const handleMouseMove = event => {
  setCoords({
    x: event.clientX - event.target.offsetLeft,
    y: event.clientY - event.target.offsetTop,
  });
};
```

`offsetLeft`属性返回当前元素的左上角在`offsetParent`节点内向左偏移的像素数。`offsetTop`属性返回当前元素的外边界相对于，位置最近的祖先元素的内边界之间的像素数。

`clientX`属性返回事件发生时，在应用程序视口中的水平坐标。`clientY`属性返回事件发生时，在应用程序视口中的垂直坐标。

## 监听鼠标事件

第二个示例向我们展示了，为了得到全局鼠标坐标，如何在`window`对象上监听`mousemove`事件。

```jsx
useEffect(() => {
  // 👇️ get global mouse coordinates
  const handleWindowMouseMove = event => {
    setGlobalCoords({
      x: event.screenX,
      y: event.screenY,
    });
  };
  window.addEventListener('mousemove', handleWindowMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleWindowMouseMove);
  };
}, []);
```

我们为`useEffect` 钩子传递空的依赖数组，因为我们只想在组件挂载时，注册`mousemove` 一次。

> 当组件卸载时，从`useEffect` 钩子返回的函数会被调用。
>

我们使用`removeEventListener` 方法来移除之前注册的事件监听。清理步骤很重要，因为我们要确保我们的应用程序中没有任何内存泄漏。

## screenX/Y属性

`screenX`属性返回全局坐标中鼠标的水平坐标（偏移）。

`screenY`属性返回全局坐标中鼠标的垂直坐标（偏移）。
