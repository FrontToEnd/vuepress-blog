# React技巧之设置input值

原文链接：[https://bobbyhadz.com/blog/react-set-input-value-on-button-click](https://bobbyhadz.com/blog/react-set-input-value-on-button-click)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，通过按钮点击设置输入框的值：

1. 声明一个`state`变量，用于跟踪输入控件的值。
2. 将`onClick`属性添加到`button`元素上。
3. 当`button`被点击时，更新`state`变量。

```jsx
import {useState} from 'react';

const App = () => {
  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleClick = event => {
    event.preventDefault();

    // 👇️ value of input field
    console.log('old value: ', message);

    // 👇️ set value of input field
    setMessage('New value');
  };

  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2>Message: {message}</h2>

      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default App;
```

![set-input-value-on-button-click.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94ff3c26b90343fe895a37610fd9917c~tplv-k3u1fbpfcp-watermark.image?)

## useState

我们使用`useState`钩子来跟踪输入控件的值。我们在控件上设置了`onChange`属性，因此每当控件的值有更新时，`handleChange`函数就会被调用。

在`handleChange`函数中，当用户键入时，我们更新了输入控件的状态。

> 我们在`button`元素上设置了`onClick`属性。每当按钮被点击时，`handleClick`函数就会被调用。
> 

要更新输入控件的状态，只需更新`state`变量。如果你需要清除输入控件的值，把它设置为空字符串。

或者，你也可以使用不受控制的输入控件。

## useRef

```jsx
import {useRef} from 'react';

const App = () => {
  const inputRef = useRef(null);

  function handleClick() {
    // 👇️ update input value
    inputRef.current.value = 'New value';

    // 👇️ access input value
    console.log(inputRef.current.value);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
      />

      <button onClick={handleClick}>Log message</button>
    </div>
  );
};

export default App;
```

上述示例使用了不受控制的`input`。需要注意的是，输入控件没有`onChange`属性或者`value`设置。

> 你可以用`defaultValue`属性给一个不受控制的`input`传递一个初始值。然而，这并不是必须的，如果你不想设置初始值，你可以省略这个属性。
> 

当使用不受控制的输入控件时，我们使用`ref`来访问`input`元素。`useRef()`钩子可以被传递一个初始值作为参数。该钩子返回一个可变的`ref`对象，其`.current`属性被初始化为传递的参数。

> 需要注意的是，我们必须访问`ref`对象的`current`属性，以获得对我们设置`ref`属性的`input`元素的访问。
> 

当我们为元素传递`ref`属性时，比如说，`<input ref={myRef} />` ，React将`ref`对象的`.current`属性设置为相应的DOM节点。

> `useRef`钩子创建了一个普通的JavaScript对象，但在每次渲染时都给你相同的`ref`对象。换句话说，它几乎是一个带有`.current`属性的记忆化对象值。
> 

需要注意的是，当你改变`ref`的`current`属性的值时，不会导致重新渲染。每当用户点击按钮时，不受控制的`input`的值会被更新。

你不应该在一个不受控制的`input`（一个没有`onChange`处理函数的输入控件）上设置`value`属性，因为这将使输入控件不可变，你将无法在其中键入。