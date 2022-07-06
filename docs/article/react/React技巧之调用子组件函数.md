# React技巧之调用子组件函数

原文链接：[https://bobbyhadz.com/blog/react-call-function-in-child-component](https://bobbyhadz.com/blog/react-call-function-in-child-component)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## forwardRef

在React中，从父组件中调用子组件的函数：

1. 在`forwardRef` 中包裹一个子组件。
2. 在子组件中使用`useImperativeHandle`钩子，来为子组件添加一个函数。
3. 在父组件中使用`ref`来调用子组件的函数。比如说，`childRef.current.childFunction()` 。

```jsx
import {forwardRef, useImperativeHandle, useRef} from 'react';

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log('child function 1 called');
    },
    childFunction2() {
      console.log('child function 2 called');
    },
  }));

  return (
    <div>
      <h2>child content</h2>
    </div>
  );
});

export default function Parent() {
  const childRef = useRef(null);

  const handleClick = () => {
    childRef.current.childFunction1();

    childRef.current.childFunction2();
  };

  return (
    <div>
      <Child ref={childRef} />

      <h2>parent content</h2>

      <button onClick={handleClick}>Call child functions</button>
    </div>
  );
}
```

![call-child-function-from-parent.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11c1c71031984fc59303973261b01c5f~tplv-k3u1fbpfcp-watermark.image?)

我们使用`forwardRef` 将父组件的`ref`转发给子组件。`forwardRef` 方法接收一个函数，该函数接收`props`和`ref`作为参数。

传递给`forwardRef` 的函数应该返回一个React节点。

我们需要转发`ref`到子组件，这样我们就可以使用`useImperativeHandle`钩子来自定义子组件的实例值，当使用`ref`时，该实例值被公开给父组件。

```jsx
useImperativeHandle(ref, () => ({
  childFunction1() {
    console.log('child function 1 called');
  },
  childFunction2() {
    console.log('child function 2 called');
  },
}));
```

渲染`<Child ref={childRef} />`的父组件，将能够以`childRef.current.childFunction1()`的方式来调用`childFunction1`。

或者，你可以使用更间接的方法。

## useEffect

在React中，从父组件中调用子组件的函数：

1. 在父组件中声明一个`count` state 变量。
2. 在子组件中，添加`count`变量为`useEffect`钩子的依赖。
3. 在父组件中增加`count`变量的值，以重新运行子组件的`useEffect`。

```jsx
import {useEffect, useState} from 'react';

const Child = ({count}) => {
  useEffect(() => {
    const childFunction1 = () => {
      console.log('child function 1 called');
    };

    const childFunction2 = () => {
      console.log('child function 2 called');
    };

    // 👇️ don't run on initial render
    if (count !== 0) {
      childFunction1();

      childFunction2();
    }
  }, [count]);

  return (
    <div>
      <h2>child content</h2>
    </div>
  );
};

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(current => current + 1);
  };

  return (
    <div>
      <Child count={count} />

      <h2>parent content</h2>

      <button onClick={handleClick}>Call child functions</button>
    </div>
  );
}
```

父组件声明了一个`count` state 变量，将其作为子组件的属性来传递给子组件。

我们将`count`变量添加到`useEffect`钩子的依赖项中。每当`count`值更新时，我们传递给`useEffect` 的函数将会运行。

```jsx
useEffect(() => {
  const childFunction1 = () => {
    console.log('child function 1 called');
  };

  const childFunction2 = () => {
    console.log('child function 2 called');
  };

  // 👇️ don't run on initial render
  if (count !== 0) {
    childFunction1();

    childFunction2();
  }
}, [count]);
```

在`useEffect` 钩子中，子组件声明并调用了两个函数。父组件可以通过改变`count` state 变量的值，来运行子组件中`useEffect`里的逻辑。

> 需要注意的是，我们在调用`useEffect` 里的函数之前，检查`count`的值是否不等于0。
> 

当组件挂载时，每当组件的依赖项发生变化时，`useEffect` 就会运行。如果你不想在挂载阶段运行`useEffect` 里的逻辑，在调用函数之前，检查`count`变量的值是否不等于0。