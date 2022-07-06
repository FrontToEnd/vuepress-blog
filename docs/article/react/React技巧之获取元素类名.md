# React技巧之获取元素类名

原文链接：[https://bobbyhadz.com/blog/react-get-class-name-of-element](https://bobbyhadz.com/blog/react-get-class-name-of-element)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，获取元素的类名：

1. 在元素上设置`ref`属性，或者使用事件处理函数。
2. 如果使用`ref`，通过`ref.current.className`来访问类名。
3. 如果使用事件处理，通过`event.currentTarget.className`来访问类名。

```jsx
import {useEffect, useRef} from 'react';

export default function App() {
  const ref = useRef(null);

  useEffect(() => {
    console.log('className 👉️', ref.current.className);

    // 👇️ check if element contains class
    if (ref.current.classList.contains('my-class')) {
      console.log('Element contains class');
    } else {
      console.log('Element does NOT contain class');
    }
  }, []);

  const handleClick = event => {
    console.log('className 👉️', event.currentTarget.className);

    // 👇️ check if element contains class
    if (event.currentTarget.classList.contains('my-class')) {
      console.log('Element contains class');
    } else {
      console.log('Element does NOT contain class');
    }
  };

  return (
    <div>
      <div ref={ref} className="my-class" onClick={handleClick}>
        Hello world
      </div>
    </div>
  );
}
```

上面的代码片段向我们展示了，当组件挂载或者事件被触发时，如何获取元素的类名。

## ref

`useRef()`钩子可以传递一个初始化作为参数。该钩子返回一个可变`ref`对象，其`.current`属性被初始化为传递的参数。

> 请注意，我们必须访问`ref`对象的`current`属性，以获得对我们设置`ref`属性的`div`元素的访问。
> 

当我们为元素传递`ref`属性时，比如说，`<div ref={myRef} />` 。React将`ref`对象的`.current`属性设置为相应的DOM节点。

我们传递一个空的依赖数组到`useEffect`钩子上，所以它只会在组件挂载时运行。

```jsx
useEffect(() => {
  console.log('className 👉️', ref.current.className);

  // 👇️ check if element contains class
  if (ref.current.classList.contains('my-class')) {
    console.log('Element contains class');
  } else {
    console.log('Element does NOT contain class');
  }
}, []);
```

我们使用`className`属性，以编程方式来获取元素的类名。

## event

如果你需要当事件触发时来获取元素的类名，可以使用`event.currentTarget.className` 。

我们在`div`元素上设置`onClick`属性，所以每当元素被点击时，`handleClick`就会被调用。

```jsx
const handleClick = event => {
  console.log('className 👉️', event.currentTarget.className);

  // 👇️ check if element contains class
  if (event.currentTarget.classList.contains('my-class')) {
    console.log('Element contains class');
  } else {
    console.log('Element does NOT contain class');
  }
};
```

> 需要注意的是，我们在`event`上使用了`currentTarget`属性，因为我们想访问事件监听器所连接的元素。
> 

`event`的`target`属性给了我们一个对触发事件的元素的引用（可以是一个后代）。

这意味着，如果你需要访问实际被点击的元素的类名，而不是事件监听器所连接的元素，你可以使用`target`属性来代替。

```jsx
const handleClick = event => {
  console.log('className 👉️', event.target.className);
};
```