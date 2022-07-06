# React技巧之检查元素是否可见

原文链接：[https://bobbyhadz.com/blog/react-check-if-element-in-viewport](https://bobbyhadz.com/blog/react-check-if-element-in-viewport)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，检查元素是否在视口范围内：

1. 在元素上设置`ref`属性。
2. 使用`IntersectionObserver` API来跟踪元素是否与视口相交。

```jsx
import {useEffect, useRef, useState, useMemo} from 'react';

export default function App() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const isInViewport1 = useIsInViewport(ref1);
  console.log('isInViewport1: ', isInViewport1);

  const isInViewport2 = useIsInViewport(ref2);
  console.log('isInViewport2: ', isInViewport2);

  return (
    <div>
      <div ref={ref1}>Top div {isInViewport1 && '| in viewport ✅'}</div>

      <div style={{height: '155rem'}} />

      <div ref={ref2}>Bottom div {isInViewport2 && '| in viewport ✅'}</div>
    </div>
  );
}

function useIsInViewport(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
```

该示例向我们展示了，如何检查元素是否在视口范围内。`IntersectionObserver` API使我们能够检查一个给定的元素是否与文档相交。

> `useIsInViewport`钩子接收一个指向我们想要追踪的元素的`ref`对象。
> 

## IntersectionObserver

`IntersectionObserver`构造函数接收一个函数，该函数被调用时带有一个`entry`数组。`entry`是一个数组，其包含了所有的`obeserver`的目标元素。这些元素的可见度已经高于或低于`intersection observer`的比率之一。

每个`entry`都描述了一个给定元素与根元素（文档）相交的程度。我们解构了这个`entry`，因为我们的`IntersectionObserver`只能跟踪一个元素（就是我们设置`ref`的那个元素）。

我们调用`observe()`方法，将我们要跟踪的元素传给它 - `observer.observe(ref.current)`。

每当元素进入视口或者存在于视口中时，我们传递给`IntersectionObserver()`构造函数的函数就会被调用，然后更新`state`变量。

```jsx
// 👇️ gets called every time element enters or leaves viewport
new IntersectionObserver(([entry]) =>
  setIsIntersecting(entry.isIntersecting),
)
```

如果我们设置`ref`对象的元素在视口中，`useIsInViewport`钩子将会返回`true`。如果元素不在视口中，该钩子将会返回`false`。

需要注意的是，在初始渲染时，`useIsInViewport` 钩子将会返回`false` 。因为我们为`useState`传递的初始值为`false`。`const [isIntersecting, setIsIntersecting] = useState(false);` 

如果你想跟踪钩子的返回值的变化，请使用`useEffect`钩子，并将该值添加到钩子的依赖关系中。

```jsx
const isInViewport1 = useIsInViewport(ref1);
console.log('isInViewport1: ', isInViewport1);

useEffect(() => {
  // 👇️ listen for changes
  console.log(isInViewport1);
}, [isInViewport1]);
```