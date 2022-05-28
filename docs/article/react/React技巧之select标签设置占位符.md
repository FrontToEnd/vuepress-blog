# React技巧之select标签设置占位符

原文链接：[https://bobbyhadz.com/blog/react-placeholder-select](https://bobbyhadz.com/blog/react-placeholder-select)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中为`select`标签设置占位符：

1. 将`select`标签的第一个`option`元素设置为`disabled`，并给它设置一个空字符串值。
2. 初始化`select`标签的`state`为空字符串。

```jsx
// App.js

import {useState} from 'react';

const App = () => {
  // 👇️ initial value of empty string (first option)
  const [selected, setSelected] = useState('');

  const handleChange = event => {
    console.log('Label 👉️', event.target.selectedOptions[0].label);
    console.log(event.target.value);

    setSelected(event.target.value);
  };

  return (
    <div>
      <select value={selected} onChange={handleChange}>
        <option disabled={true} value="">
          --Choose and option--
        </option>
        <option value="apple">Apple 🍏</option>
        <option value="banana">Banana 🍌</option>
        <option value="kiwi">Kiwi 🥝</option>
      </select>
    </div>
  );
};

export default App;
```

![react-placeholder-select.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6ac70af10604dddb3622b2089f2ab94~tplv-k3u1fbpfcp-watermark.image?)

我们成功的为`select`标签添加了占位符。

## 设置option标签

需要注意的是，我们初始化`selected`状态为`''` （空字符串）。

```jsx
const [selected, setSelected] = useState('');
```

接下来，设置第一个`option`标签为`disabled`，并给它设置一个空字符串值。

```jsx
<div>
  <select value={selected} onChange={handleChange}>
    <option disabled={true} value="">
      --Choose and option--
    </option>
    <option value="apple">Apple 🍏</option>
    <option value="banana">Banana 🍌</option>
    <option value="kiwi">Kiwi 🥝</option>
  </select>
</div>
```

第一个`option`元素将被展示，但是用户无法使用鼠标或者键盘选择该元素，因为我们设置了`disabled`属性为`true`。

## 设置change事件

我们在`select`元素上设置了`onChange`事件，所以每当值有变化的时候，`handleChange`函数会被调用。

```jsx
const handleChange = event => {
  console.log('Label 👉️', event.target.selectedOptions[0].label);
  console.log(event.target.value);

  setSelected(event.target.value);
};
```

`event`对象上的`target`属性是`select`元素的引用，因此我们可以使用`event.target.value`访问被选中的值。

在`handleChange`函数中，我们使用被选择选项的值来更新`state`。

## 遍历生成

你也可以将选项添加到一个数组中，并使用`map()`方法对其进行迭代，以避免重复操作。

```jsx
import {useState} from 'react';

const App = () => {
  const options = [
    {value: '', text: '--Choose an option--', disabled: true},
    {value: 'apple', text: 'Apple 🍏'},
    {value: 'banana', text: 'Banana 🍌'},
    {value: 'kiwi', text: 'Kiwi 🥝'},
  ];

  // 👇️ initial value of empty string (first option)
  const [selected, setSelected] = useState('');

  const handleChange = event => {
    console.log('Label 👉️', event.target.selectedOptions[0].label);
    console.log(event.target.value);

    setSelected(event.target.value);
  };

  return (
    <div>
      <select value={selected} onChange={handleChange}>
        {options.map(option => (
          <option
            disabled={option.disabled}
            key={option.value}
            value={option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
```

这个例子在一个数组中定义了所有的选项，以便使我们的`JSX`代码更加简洁。
