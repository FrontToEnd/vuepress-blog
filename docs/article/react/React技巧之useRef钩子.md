# React技巧之useRef钩子

原文链接：[https://bobbyhadz.com/blog/react-update-state-when-props-change](https://bobbyhadz.com/blog/react-update-state-when-props-change)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 与document.querySelector等价

在React中，与`document.querySelector()` 方法等价的是使用`refs`。为了选择一个元素，在元素上设置`ref`属性，并设置为调用`useRef()`钩子的返回值。并使用`ref`上的`current`属性访问`dom`元素，例如`ref.current` 。

```jsx
import {useRef, useEffect} from 'react';

export default function App() {
  const ref = useRef(null);

  useEffect(() => {
    // 👇️ use a ref (best)
    const el2 = ref.current;
    console.log(el2);

    // 👇️ use document.querySelector()
    // should only be used when you can't set a ref prop on the element
    // (you don't have access to the element)
    const el = document.querySelector('#container');
    console.log(el);
  }, []);

  return (
    <div>
      <div ref={ref} id="container">
        <h2>Some content here</h2>
      </div>
    </div>
  );
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f32f23cc83e4b4aa0346afecc9ac85a~tplv-k3u1fbpfcp-watermark.image?)

## useRef()钩子

`useRef()`钩子可以传递一个初始化值作为参数。该钩子返回一个可变的`ref`对象，其`.current`属性被初始化为传递的参数。

> 需要注意的是，我们必须访问`ref`对象的`current`属性，以获得对我们设置了`ref`属性的`div`元素的访问。
>

```jsx
const el2 = ref.current;
console.log(el2);
```

当我们给元素传递`ref`属性时，比如说，`<div ref={myRef} />` ，React将`ref`对象的`.current`属性设置为相应的DOM节点。

我们为`useEffect`钩子传递一个空的依赖数组，因此只有当组件挂载时才会运行。

```jsx
useEffect(() => {
  const el2 = ref.current;
  console.log(el2);
}, []);
```

这里我们使用`useEffect`钩子，是因为我们想要确保`ref`已经被设置在了元素上，并且元素已经渲染成为DOM。

需要注意的是，当使用`ref`来访问元素的时候，你不必在元素上设置`id`属性。

这里有一个在React中使用`ref`的极简示例。

```jsx
import {useRef, useEffect} from 'react';

export default function App() {
  const ref = useRef(null);

  useEffect(() => {
    const el2 = ref.current;
    console.log(el2);
  }, []);

  return (
    <div>
      <div ref={ref}>
        <h2>Some content here</h2>
      </div>
    </div>
  );
}
```

## document.querySelector

如果你不能访问你试图在你的组件中选择的元素，并且不能简单地对其设置`ref` 属性，那么就使用`document.querySelector`方法。

```jsx
import {useEffect} from 'react';

export default function App() {
  useEffect(() => {
    // 👇️ use a ref (best)
    const el = document.querySelector('#container');
    console.log(el);
  }, []);

  return (
    <div>
      <div id="container">
        <h2>Some content here</h2>
      </div>
    </div>
  );
}
```

你必须在`useEffect`钩子，或者某个事件发生时调用`document.querySelector()`方法。举个例子，你可以在`onClick`事件处理函数中安全的访问`ref`上的`current`属性，那是因为当事件被触发时，该元素将出现在DOM中。

## 总结

如果你试图通过 `document.querySelector` 或 `ref` 直接在你的函数组件的`render`方法中访问一个元素，该元素可能还没有渲染。

`useEffect`钩子是在组件中的DOM元素被渲染到DOM后运行的，所以如果提供了`id`属性的元素存在，那么将会被选中。
