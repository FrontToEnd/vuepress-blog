# React技巧之改变元素样式

原文链接：[https://bobbyhadz.com/blog/react-change-style-on-click](https://bobbyhadz.com/blog/react-change-style-on-click)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 三元运算符

在React中，通过点击事件来改变元素的样式：

1. 在元素上设置`onClick`属性。
2. 当元素被点击时，设置激活的`state`。
3. 使用三元运算符，基于`state`变量有条件地设置新样式。

```jsx
import {useState} from 'react';

export default function App() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: isActive ? 'salmon' : '',
          color: isActive ? 'white' : '',
        }}
        onClick={handleClick}
      >
        Click
      </button>
    </div>
  );
}
```

我们在元素上设置了`onClick` 属性，所以每当元素被点击时，`handleClick`函数就会被调用。在该函数中，我们只是切换`isActive`状态。

> 如果你不想在每次点击元素时改变样式，你可以将状态设置为激活，例如`setIsActive(true)`。
> 

我们使用三元运算符，有条件地在元素上设置`backgroundColor` 样式。

```jsx
<button
  style={{
    backgroundColor: isActive ? 'salmon' : '',
    color: isActive ? 'white' : '',
  }}
  onClick={handleClick}
>
  Click
</button>
```

三元运算符与`if/else` 语句十分相似。换句话说，如果`isActive` 变量值为`true`，我们会设置`backgroundColor`属性为`salmon`，否则设置为空字符串。

你可以用这种方法来改变组件中任何元素的样式，它不一定是用户点击的那个。

## currentTarget

同样的，你可以使用`event`对象上的`currentTarget`属性。

1. 在元素上设置`onClick`属性。
2. 在事件处理函数中，通过`event.currentTarget`访问元素。
3. 在元素上使用`style`对象设置样式。

```jsx
export default function App() {
  const handleClick = event => {
    event.currentTarget.style.backgroundColor = 'salmon';
    event.currentTarget.style.color = 'white';

    event.currentTarget.classList.add('my-class-1', 'my-class-2');
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

我们可以通过`event`对象上的`currentTarget`属性来访问元素。`event`上的`currentTarget`属性让我们可以访问事件监听器所连接的元素。

下面的示例向我们展示了，如何通过点击事件改变元素上的样式。

```jsx
export default function App() {
  const handleClick = event => {
    // 👇️ toggle styles on click
    if (event.currentTarget.style.backgroundColor) {
      event.currentTarget.style.backgroundColor = null;
      event.currentTarget.style.color = null;
    } else {
      event.currentTarget.style.backgroundColor = 'salmon';
      event.currentTarget.style.color = 'white';
    }

    // 👇️ toggle class on click
    event.currentTarget.classList.toggle('my-class-1', 'my-class-2');
  };
发。
  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

如果你需要在点击时为元素设置一个样式，你可以直接通过元素的`style`对象设置样式。

```jsx
event.currentTarget.style.backgroundColor = 'salmon';
```

然而，如果你必须在每次点击元素时切换样式，你就必须有条件地检查该类是否存在，如果存在就将其删除，否则就添加该类。

如果你需要为元素添加样式，可以使用`classList.add`方法。

```jsx
// 👇️ add class
event.currentTarget.classList.add('my-class-1', 'my-class-2');

// 👇️ remove class
event.currentTarget.classList.remove('my-class-1', 'my-class-2');
```

该方法可以可以传递一个或多个`class`。

如果你需要在点击时为元素切换样式，可以使用`classList.toggle`方法。

```jsx
event.currentTarget.classList.toggle('my-class-1', 'my-class-2');
```

`classList.toggle`方法从元素中移除一个现有的类，如果该类存在的话。否则，它会将该类添加到该元素中。