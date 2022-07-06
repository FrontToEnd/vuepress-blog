# React技巧之处理tab页关闭事件

原文链接：[https://bobbyhadz.com/blog/react-handle-tab-close-event](https://bobbyhadz.com/blog/react-handle-tab-close-event)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，处理浏览器tab页关闭事件：

1. 使用`useEffect`钩子添加事件监听器。
2. 监听`beforeunload`事件。
3. 在即将卸载tab页时，会触发`beforeunload`事件。

```jsx
import {useEffect} from 'react';

const App = () => {
  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div>
      <h2>hello world</h2>
    </div>
  );
};

export default App;
```

我们在`useEffect`钩子中为`window`对象添加了一个事件监听器。我们为`useEffect`钩子传递一个空的依赖数组，所以只会当组件挂载时运行。

## beforeunload

当窗口或者tab页即将被卸载时，`beforeunload`事件会被触发。这时，页面仍然是可见的，事件仍然是可以取消的。

> 这使我们能够打开一个对话框，询问用户是否真的想离开该页面。
> 

用户可以确认并导航到新的页面，或者取消导航。需要注意的是，并不确定事件会被触发。比如说，用户可以在其浏览器设置中禁用弹出窗口。

我们使用`addEventListener`方法在`window`对象上添加一个事件监听器。该方法接受的第一个参数是要监听的事件的类型，第二个参数是一个函数，当指定类型的事件发生时被调用。

我们从`useEffect`钩子返回的函数在组件卸载时被调用。我们使用`removeEventListener`方法来移除我们之前注册的事件监听器。

清理步骤很重要，因为我们要确保我们的应用程序中没有任何内存泄漏。

## 总结

我们介绍了如何处理tab页关闭事件，主要是通过`beforeunload`事件进行监听，并在回调事件里做相应的逻辑处理。需要注意的是，需要在组件卸载时，取消对事件的监听，防止内存泄漏情况的发生。