# React技巧之添加或移除类

原文链接：[https://bobbyhadz.com/blog/react-add-remove-class-on-click](https://bobbyhadz.com/blog/react-add-remove-class-on-click)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## useState

在React中，通过点击事件来添加或者移除类：

1. 在元素上设置`onClick`属性。
2. 将活动状态存储在`state`变量中。
3. 使用三元操作符有条件的添加类。

```jsx
import {useState} from 'react';
import './App.css';

export default function App() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };

  return (
    <div>
      <button className={isActive ? 'bg-salmon' : ''} onClick={handleClick}>
        Click
      </button>
    </div>
  );
}
```

下面是示例中的css。

```css
.bg-salmon {
  background-color: salmon;
  color: white;
}
```

![add-remove-class-on-click.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1dcadd77328458e999039f7badde68c~tplv-k3u1fbpfcp-watermark.image?)

另外，你也可以使用`event`对象以编程方式添加或删除类。

## event

在React中，通过点击事件来添加或者移除类：

1. 在元素上设置`onClick`属性。
2. 使用`event.currentTarget`访问DOM元素。
3. 使用`classList.add()` 或者 `classList.remove()` 方法。

```jsx
import './App.css';

export default function App() {
  const handleClick = event => {
    // 👇️ toggle class on click
    event.currentTarget.classList.toggle('bg-salmon');

    // 👇️ add class on click
    // event.currentTarget.classList.add('bg-salmon');

    // 👇️ remove class on click
    // event.currentTarget.classList.remove('bg-salmon');
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

我们在`button`元素上设置了`onClick`属性，因此每当元素被点击时，`handleClick`函数就会被调用。我们可以通过`event`对象上的`currentTarget`属性访问元素。

`event`上的`currentTarget`属性让我们可以访问事件监听器所连接的元素。而`event`的`target`属性给了我们一个对触发事件的元素的引用（可以是一个后代）。

### toggle

该示例向我们展示了，如何使用`classList.toggle` 方法来切换类。

```jsx
event.currentTarget.classList.toggle('bg-salmon');
```

`classList.toggle`方法从元素中移除一个现有的类，如果该类存在的话。否则，它会将该类添加到该元素中。如有必要，你可以在`toggle()` 方法上传递多个类。

```jsx
event.currentTarget.classList.toggle(
  'bg-salmon',
  'my-class-2',
  'my-class-3',
);
```

### add

如果你需要通过点击事件为元素添加类，可以使用`classList.add` 方法。

```jsx
event.currentTarget.classList.add(
  'bg-salmon',
  'my-class-2',
  'my-class-3',
);
```

如果指定的类已存在于元素上，`classList.add()` 方法不会重复添加。

### remove

如果你需要从元素中移除类，使用`classList.remove` 方法。

```jsx
event.currentTarget.classList.remove(
  'bg-salmon',
  'my-class-2',
  'my-class-3',
);
```

如果元素上不存在指定的类，`classList.remove()` 方法会忽略该类。否则会从元素的类列表中移除该类。