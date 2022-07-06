# React技巧之检查复选框是否选中

原文链接：[https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked](https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，使用event对象上的`target.checked` 属性，来检查复选框是否选中。比如说，`if (event.target.checked) {}` 。或者在state变量中存储`checked`值，或者访问不受控制的复选框的`ref.current.checked` 属性。

```jsx
import {useState} from 'react';

export default function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleChange = event => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
    setIsSubscribed(current => !current);
  };

  return (
    <div>
      <label htmlFor="subscribe">
        <input
          type="checkbox"
          value={isSubscribed}
          onChange={handleChange}
          id="subscribe"
          name="subscribe"
        />
        Subscribe
      </label>
    </div>
  );
}
```

![react-check-if-checkbox-checked-controlled.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb90aa94fbdb4ae69f5cd37c168c20f4~tplv-k3u1fbpfcp-watermark.image?)

> 如果对`ref`使用不受控制的复选框，请向下滚动到下一个代码片段。
> 

## event

`event`对象上的`target`属性引用`input`元素，因此我们可以通过`event.target.checked`来访问`checked`值。

> 需要注意的是，我们为`setIsSubscribed`传递了一个函数，因为该函数被保证以`isSubscribed`布尔值的当前（最新的）值来调用。
> 

当我们需要基于当前state来计算下个state值时，这是非常有用的。

## ref

要检查一个不受控制的复选框是否被选中，可以访问`ref`对象上的`current.checked`属性。

```jsx
import {useRef} from 'react';

export default function App() {
  const ref = useRef(null);

  const handleClick = () => {
    if (ref.current.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
  };

  return (
    <div>
      <label htmlFor="subscribe">
        <input ref={ref} type="checkbox" id="subscribe" name="subscribe" />
        Subscribe
      </label>

      <br />

      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

![check-if-checkbox-checked-uncontrolled.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fecda490ca94de582a4d28c71caf01a~tplv-k3u1fbpfcp-watermark.image?)
`useRef()`钩子可以传递一个初始值作为参数。该钩子返回一个可变的`ref`对象，其`.current`属性被初始化为传递的参数。需要注意的是，我们必须访问`ref`对象上的`current`属性，来访问设置了`ref`属性的复选框元素。

当我们为元素传递ref属性时，比如说，`<input ref={myRef} />` ，React将`ref`对象的`.current`属性设置为对应的DOM节点。每当点击`button`按钮时，`handleClick`函数就会被调用，同时检查复选框是否被选中。

> `useRef`钩子创建了一个普通的JavaScript对象，但在每次渲染时都给你相同的`ref`对象。换句话说，它几乎是一个带有`.current`属性的记忆化对象值。
> 

你可以在复选框元素上通过`ref.current` 访问任意属性。如果你打印`ref`对象上的`current`属性，你会发现它只是对`input`元素的引用。