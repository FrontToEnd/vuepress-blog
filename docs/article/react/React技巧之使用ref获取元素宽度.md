# React技巧之使用ref获取元素宽度

原文链接：[https://bobbyhadz.com/blog/react-get-element-width-ref](https://bobbyhadz.com/blog/react-get-element-width-ref)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，使用ref获取元素的宽度：

1. 在元素上设置`ref`属性。
2. 在`useLayoutEffect`钩子中，更新宽度的`state`变量。
3. 使用`offsetWidth`属性获取元素宽度。

```jsx
import {useLayoutEffect, useRef, useState} from 'react';

export default function App() {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);
 
  return (
    <div ref={ref}>
      <h2>Width: {width}</h2>

      <h2>Height: {height}</h2>
    </div>
  );
}
```

`useRef()`钩子可以传递一个初始化作为参数。该钩子返回一个可变`ref`对象，其`.current`属性被初始化为传递的参数。

> 请注意，我们必须访问`ref`对象的`current`属性，以获得对我们设置`ref`属性的`div`元素的访问。
> 

当我们为元素传递`ref`属性时，比如说，`<div ref={myRef} />` 。React将`ref`对象的`.current`属性设置为相应的DOM节点。

## useLayoutEffect

我们传递一个空的依赖数组到`useLayoutEffect` 钩子上，所以它只会在组件挂载时运行。

```jsx
useLayoutEffect(() => {
  setWidth(ref.current.offsetWidth);
  setHeight(ref.current.offsetHeight);
}, []);
```

`useLayoutEffect`钩子与`useEffect`相同，但在所有DOM突变后同步触发。`useLayoutEffect` 钩子经常被用来从DOM中读取布局。

我们使用了`useLayoutEffect`钩子，因为我们需要等待元素上的`ref`被设置，并且在访问其`offsetHeight`和`offsetWidth`属性之前，元素被渲染。

`offsetWidth`属性以像素为单位返回元素的宽度，包括任何边框、内填充和垂直滚动条（如果存在的话）。

`offsetHeight`属性返回元素的高度，单位是像素，包括垂直内填充和边框。

或者，你可以使用`clientWidth`属性，它返回元素的宽度，单位是像素，包括内填充，但不包括边框、外边距和垂直滚动条（如果存在的话）。

```jsx
useLayoutEffect(() => {
  setWidth(ref.current.clientWidth);
  setHeight(ref.current.clientHeight);
}, []);
```

## 总结

我们通过`ref`来获取元素的宽度和高度，主要是在`useLayoutEffect`钩子中通过`ref.current`来引用DOM元素，获取元素上面的`offsetWidth`和`offsetHeight` 。