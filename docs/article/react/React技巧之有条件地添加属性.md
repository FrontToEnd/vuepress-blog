# React技巧之有条件地添加属性

原文链接：[https://bobbyhadz.com/blog/react-conditional-attribute](https://bobbyhadz.com/blog/react-conditional-attribute)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

使用三元运算符来为React组件有条件地添加属性。比如说，`<button disabled={count > 3 ? true : null}>` 。如果问号左边的值是`truthy`（真值），操作符会返回冒号左边的值，否则会返回右边的值。

```jsx
import './App.css';
import {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const role = 'link';

  let myClass = '';
  if (count >= 0) {
    myClass = 'bg-salmon';
  }

  return (
    <div>
      {/* 👇️ conditionally set attribute value with ternary operator */}
      <button
        disabled={count > 3 ? true : null}
        onClick={() => setCount(current => current + 1)}
      >
        Count: {count}
      </button>

      {/* 👇️ using a variable */}
      <a href="https://google.com" role={role}>
        Google.com
      </a>

      {/* 👇️ interpolating a variable */}
      <h2 className={`text-white ${myClass}`}>Some content</h2>
    </div>
  );
}
```

下面是本文中示例的css。

```css
.bg-salmon {
  background-color: salmon;
}

.text-white {
  color: white;
}
```

## 三元运算符

代码片段中的第一个示例使用三元运算符有条件地设置元素的属性。

```jsx
<button
  disabled={count > 3 ? true : null}
  onClick={() => setCount(current => current + 1)}
>
  Count: {count}
</button>
```

代码会检查`count`变量的值是否比`3`大，如果是，会返回`true`给`disabled`属性，否则会返回`null`。

## 代码逻辑

你还可以在JSX代码之外使用判断逻辑，然后使用一个变量来设置属性。

```jsx
import './App.css';

export default function App() {
  const role = 'link';

  let myClass = '';
  if ('hi'.length >= 0) {
    myClass = 'bg-salmon';
  }

  return (
    <div>
      {/* 👇️ using a variable */}
      <a href="https://google.com" role={role}>
        Google.com
      </a>

      {/* 👇️ interpolating a variable */}
      <h2 className={`text-white ${myClass}`}>Some content</h2>
    </div>
  );
}
```

当设置`myClass`变量时，你可以使用任何你需要的代码逻辑，然后当设置属性时使用该逻辑。

> 每当组件重新渲染时，你的代码逻辑就会重新运行，并更新变量的值。
>

## 扩展语法

你也可以创建一个包含属性名和值的对象，然后使用扩展语法（...）来设置元素上的`props`。

```jsx
import {useState} from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const attrs = {};

  if ('hi'.length === 2) {
    attrs.role = 'button';
    attrs.onClick = () => {
      setCount(current => current + 1);
    };
  }

  return (
    <div>
      <button {...attrs}>Count: {count}</button>
    </div>
  );
}
```

我们初始化了一个空对象，然后有条件地在空对象上面设置属性。扩展语法被用来解包对象上的所有键值对，并将它们设置为元素上的`props`。

你可以使用任何代码逻辑和条件语句来构建对象。通常情况下，我们使用三元运算符来为元素添加条件属性。

这里有一个示例，用来有条件地在元素上设置`display`属性。

```jsx
import {useState} from 'react';

export default function App() {
  const [isShown, setIsShown] = useState(true);

  const handleClick = event => {
    // 👇️ toggle visibility
    setIsShown(current => !current);
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle visibility</button>

      <div style={{display: isShown ? 'block' : 'none'}}>
        <h2>Some content here</h2>
      </div>
    </div>
  );
}
```

如果问号左边的值是`truthy`，操作符会返回冒号左边的值，否则会返回冒号右边的值。

```jsx
const result1 = 5 === 5 ? 'yes' : 'no';
console.log(result1); // 👉️ "yes"

const result2 = 5 === 10 ? 'yes' : 'no';
console.log(result2); // 👉️ "no"
```

如果`isShown`变量的值为`truthy`值，我们为`display`属性设置为`block`，否则设置为`none`。
