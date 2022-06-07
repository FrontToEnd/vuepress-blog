# React技巧之用钩子`clearTimeout`

原文链接：[https://bobbyhadz.com/blog/react-cleartimeout](https://bobbyhadz.com/blog/react-cleartimeout)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

要在React中用钩子清除一个超时或间隔：

1. 使用`useEffect`钩子设置一个`setTimeout` 或者`setInterval`。
2. 从`useEffect`钩子中返回一个函数。
3. 在组件卸载时，使用`clearTimeout()`或者`clearInterval()`方法来移除定时器。

```jsx
// App.js

import {useEffect, useState} from 'react';

export default function App() {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setIsShown(true);
    }, 1000);

    return () => {
      // 👇️ clear timeout when component unmounts
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <div>
      {isShown ? (
        <div>
          <h2>isShown = true</h2>
        </div>
      ) : (
        <div>
          <h2>isShown = false</h2>
        </div>
      )}
    </div>
  );
}
```

## clearTimeout

> 如果你需要清理间隔，请往下翻到下一节。
>

我们给`useEffect` 钩子传递空的依赖数组，因为我们只需要当组件挂载时，注册定时器一次。

> 需要注意的是，你可以在相同的组件中多次调用`useEffect` 钩子。
>

我们在`useEffect` 钩子中使用`setTimeout()`方法，但是我们必须确保清除定时器，防止内存泄漏。举例来说，如果组件在定时器到期前卸载，而我们没有清除定时器，我们就会有一个内存泄漏。

当组件卸载时，我们从`useEffect`钩子返回的函数会被调用。

```jsx
// App.js

useEffect(() => {
  const timer = setTimeout(() => {
    setIsShown(true);
  }, 1000);

  // 👇️ runs when component unmounts
  return () => {
    clearTimeout(timer);
  };
}, []);
```

我们使用`clearTimeout`方法来取消之前注册的定时器。如果组件在延迟结束前卸载，`clearTimeout`方法会运行并取消定时器。

## clearInterval

同样的，我们可以使用`clearInterval`方法取消间隔，使用`setInterval` 注册间隔。

```jsx
// App.js

import {useEffect, useState} from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // 👇️ cancel interval when component unmounts
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
    </div>
  );
}
```

当组件卸载时，我们运行`clearInterval` 方法来取消先前注册的间隔。

## 总结

清理步骤很重要，因为我们要确保我们的应用程序中没有任何内存泄漏。
