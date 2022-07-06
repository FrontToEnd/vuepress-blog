# React技巧之表单提交获取input值

原文链接：[https://bobbyhadz.com/blog/react-get-form-input-value-on-submit](https://bobbyhadz.com/blog/react-get-form-input-value-on-submit)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，通过表单提交获得`input`的值：

1. 在`state`变量中存储输入控件的值。
2. 在`form`表单上设置`onSubmit`属性。
3. 在`handleSubmit`函数中访问输入控件的值。

```jsx
import {useState} from 'react';

const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log('firstName 👉️', firstName);
    console.log('lastName 👉️', lastName);

    // 👇️ clear all input values in the form
    setFirstName('');
    setLastName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="first_name"
          name="first_name"
          type="text"
          onChange={event => setFirstName(event.target.value)}
          value={firstName}
        />
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />

        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default App;
```

![get-form-input-value-on-submit.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a2ab5fba258419c80517980d905360b~tplv-k3u1fbpfcp-watermark.image?)

## 受控控件

我们使用`useState`钩子来跟踪输入控件的值。我们在控件上设置`onChange`属性，因此当控件上的值更新时，我们更新相应的`state`变量。

`form`表单上的`button`元素具有`submit`类型，所以每当按钮被点击时，`form`表单上的`submit`事件就会被触发。

> 当`form`表单被提交时，我们在`handleSubmit`函数中使用`event.preventDefault()` ，以此来阻止`form`表单页面刷新。
> 

为了获得表单提交时的输入值，我们只需访问`state`变量。如果你想在表单提交后清空控件值，可以设置`state`变量为空字符串。

## 不受控控件

类似地，可以使用不受控制的输入控件。

1. 在每个输入控件上设置`ref`属性。
2. 在`form`元素上设置`onSubmit`属性。
3. 在`ref`对象上访问`input`的值，比如，`ref.current.value` 。

```jsx
import {useRef} from 'react';

const App = () => {
  const firstRef = useRef(null);
  const lastRef = useRef(null);

  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log('first 👉️', firstRef.current.value);
    console.log('last 👉️', lastRef.current.value);

    // 👇️ clear all input values in the form
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={firstRef}
          id="first_name"
          name="first_name"
          type="text"
        />
        <input
          ref={lastRef}
          id="last_name"
          name="last_name"
          type="text"
        />

        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default App;
```

上述示例使用了不受控制的输入控件。需要注意的是，输入控件没有`onChange`属性或者值设置。

> 你可以用`defaultValue`属性给一个不受控制的`input`传递一个初始值。然而，这并不是必须的，如果你不想设置初始值，你可以省略这个属性。
> 

当使用不受控制的输入控件时，我们使用`ref`来访问`input`元素。`useRef()`钩子可以被传递一个初始值作为参数。该钩子返回一个可变的`ref`对象，其`.current`属性被初始化为传递的参数。

> 需要注意的是，我们必须访问`ref`对象的`current`属性，以获得对我们设置`ref`属性的`input`元素的访问。
> 

当我们为元素传递`ref`属性时，比如说，`<input ref={myRef} />` ，React将`ref`对象的`.current`属性设置为相应的DOM节点。

> `useRef`钩子创建了一个普通的JavaScript对象，但在每次渲染时都给你相同的`ref`对象。换句话说，它几乎是一个带有`.current`属性的记忆化对象值。
> 

需要注意的是，当你改变`ref`的`current`属性的值时，不会导致重新渲染。每当用户提交表单时，不受控制的`input`的值会被打印。

你不应该在一个不受控制的`input`（一个没有`onChange`处理函数的输入控件）上设置`value`属性，因为这将使输入控件不可变，你将无法在其中键入。

### reset

> 如果你想在表单提交后清除不受控制的`input`值，你可以使用`reset()`方法。
> 

`reset()`方法还原表单元素的默认值。不管你的表单有多少不受控制的输入控件，只要调用`reset()`方法就可以清除所有的字段。

当表单被提交时，获取输入控件值的另一种方法是，使用`name`属性访问表单元素。

```bash
const App = () => {
  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault();

    // 👇️ access input values using name prop
    console.log('first 👉️', event.target.first_name.value);
    console.log('second 👉️', event.target.last_name.value);

    // 👇️ clear all input values in the form
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="first_name"
          name="first_name"
          type="text"
        />
        <input
          id="last_name"
          name="last_name"
          type="text"
        />

        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default App;
```

`event`对象上的`target`属性引用`form`元素。

> 你不会经常看到这种方法，如果你不想在`state`中存储输入控件的值或使用`ref`对象，就可以使用这种方法。这主要是一种快速和不整洁的解决方案。
> 

最常用的方法是将`input`值存储在`state`变量中。从任何地方访问`state`变量的能力允许高度可定制的表单。