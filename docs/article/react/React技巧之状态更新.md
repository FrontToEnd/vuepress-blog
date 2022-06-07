# React技巧之状态更新

原文链接：[https://bobbyhadz.com/blog/react-update-state-when-props-change](https://bobbyhadz.com/blog/react-update-state-when-props-change)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，当props变动时更新状态，我们需要：

1. 将`props`作为依赖传递给`useEffect`钩子。
2. 每当`props`更新时，`useEffect`中的逻辑代码就会重新运行。

```jsx
import {useEffect, useState} from 'react';

function Child({parentCount}) {
  const [childCount, setChildCount] = useState(0);

  useEffect(() => {
    setChildCount(parentCount * 2);

    console.log('useEffect logic ran');
  }, [parentCount]); // 👈️ add props as dependencies

  return (
    <div>
      <button>Child count {childCount}</button>
    </div>
  );
}

export default function Parent() {
  const [parentCount, setParentCount] = useState(0);

  return (
    <div>
      <button onClick={() => setParentCount(current => current + 1)}>
        Parent count: {parentCount}
      </button>

      <hr />

      <Child parentCount={parentCount} />
    </div>
  );
}
```

![update-state-on-props-change.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5afcdc990aa94ab68fbbdd41fac3e655~tplv-k3u1fbpfcp-watermark.image?)

## 使用useEffect钩子

当`props`改变时，我们使用`useEffect`钩子来更新组件中的状态。

```jsx
useEffect(() => {
  setChildCount(parentCount * 2);

  console.log('useEffect logic ran');
}, [parentCount]); // 👈️ add props as dependencies
```

当`useEffect`钩子的依赖改变时，它内部的逻辑代码就会重新运行。

每当`parentCount`属性值变化时，`useEffect`钩子会重新运行，并且我们使用`setChildCount`函数来更新子组件的状态。

> 把你想追踪的所有`props`添加到你的`useEffect`钩子的依赖数组中。
>

## 避免初次渲染时执行useEffect

需要注意的是，当组件初始化渲染时，我们传递给`useEffect`钩子的函数也会被调用。如果你不想在初始渲染时运行`useEffect`钩子中的逻辑，而只是在特定`prop`改变时才运行，那么在初始渲染时使用一个`ref`来提前返回。

```jsx
import {useEffect, useRef, useState} from 'react';

function Child({parentCount}) {
  const [childCount, setChildCount] = useState(0);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 👈️ return early if first render
    }
    setChildCount(parentCount * 2);

    console.log('useEffect logic ran');
  }, [parentCount]);

  return (
    <div>
      <button>Child count {childCount}</button>
    </div>
  );
}

export default function Parent() {
  const [parentCount, setParentCount] = useState(0);

  return (
    <div>
      <button onClick={() => setParentCount(current => current + 1)}>
        Parent count: {parentCount}
      </button>

      <hr />

      <Child parentCount={parentCount} />
    </div>
  );
}
```

当`useEffect`钩子在组件挂载时运行，我们用一个`ref`来提前退出。如果你想监听`props`的变化，但需要跳过第一次渲染，可以使用这种方法。

## 无限循环

> 需要注意的是，如果你更新了一个`prop`的值，并且该`prop`存在于钩子的依赖数组中，你将会导致一个无限的重新渲染循环。
>

下面的例子说明了这个问题。

```jsx
import {useEffect, useState} from 'react';

function Child({parentCount, setParentCount}) {
  useEffect(() => {
    // 👇️ this causes infinite loop
    setParentCount(current => current + 1);

    console.log('useEffect logic ran');
  }, [parentCount, setParentCount]); // 👈️ parentCount is a dependency

  return (
    <div>
      <button>Parent count {parentCount}</button>
    </div>
  );
}

export default function Parent() {
  const [parentCount, setParentCount] = useState(0);

  return (
    <div>
      <Child setParentCount={setParentCount} parentCount={parentCount} />
    </div>
  );
}
```

该示例的问题在于，我们添加了`parentCount`属性到钩子的依赖函数中，但是我们也在钩子中更新它的值。每次运行`useEffect`时，`parentCount`的值都会发生变化，这就会再次重新运行钩子，因为`parentCount`在它的依赖数组中。
