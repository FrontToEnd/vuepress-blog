# React技巧之鼠标悬浮添加行内样式

原文链接：[https://bobbyhadz.com/blog/react-inline-style-hover](https://bobbyhadz.com/blog/react-inline-style-hover)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，鼠标悬浮时添加行内样式：

1. 在元素上设置`onMouseEnter`和`onMouseLeave`属性。
2. 当用户鼠标移入或者移出元素时，更新`state`变量。
3. 在元素上有条件地设置行内样式。

```jsx
import {useState} from 'react';

const App = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: isHovering ? 'salmon' : '',
            color: isHovering ? 'white' : '',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hover me
        </div>
      </div>
    </div>
  );
};

export default App;
```

![react-hover-inline-styles.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44fea69ac1f0410ba859cf8888f55005~tplv-k3u1fbpfcp-watermark.image?)

## 详情

我们在`div`元素上设置了`onMouseEnter` 和 `onMouseLeave` ****属性。

当用户的鼠标移入当前元素时，`mouseenter`事件会被触发。相反地，当用户的鼠标移出当前元素时，`mouseleave`事件会被触发。

每当用户将鼠标悬停在`div`上时，就会调用`handleMouseEnter`函数。每当用户将鼠标指针移出`div`元素时，就会调用`handleMouseLeave`函数。

> 我们在这两个事件处理程序中所做的就是更新一个`state`变量，跟踪用户是否在该元素上悬停。
>

我们可以使用三元运算符，来有条件地在元素上设置行内样式。

```jsx
<div
  style={{
    backgroundColor: isHovering ? 'salmon' : '',
    color: isHovering ? 'white' : '',
  }}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  Hover me
</div>
```

三元运算符和`if/else`运算符非常的相似。

> 它检查问号左边的值是否为真值，如果是，操作符就返回冒号左边的值，否则就返回右边的值。
>

换句话说，如果`isHovering`变量存储的值为`true`，我们将`backgroundColor`属性设置为`salmon`，否则我们将其设置为空字符串。

## 总结

当用户鼠标悬停在元素上时：

1. `handleMouseEnter`函数会被调用。
2. `isHovering` state变量会被设置为`true`。
3. 有条件地在元素上设置行内样式。

相反地，当用户鼠标离开元素时：

1. `handleMouseLeave`函数会被调用。
2. `isHovering` state变量会被设置为`false`。
3. 恢复元素的样式。
