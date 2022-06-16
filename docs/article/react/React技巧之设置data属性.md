# React技巧之设置data属性

原文链接：[https://bobbyhadz.com/blog/react-set-data-attribute](https://bobbyhadz.com/blog/react-set-data-attribute)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，为元素设置data属性的话，直接在元素上设置属性即可。比如说，`<button data-test-id="my-btn">` ，或者使用`setAttribute()` 方法。比如说，`el.setAttribute('data-foo', 'bar')` 。你可以在`event`对象上或者使用`ref`来访问元素。

```jsx
export default function App() {
  const handleClick = event => {
    console.log(event.target.dataset);

    // 👇️ "my-btn"
    console.log(event.target.getAttribute('data-test-id'));

    // 👇️ set attribute
    event.target.setAttribute('data-foo', 'bar');
    console.log(event.target.getAttribute('data-foo')); // 👉️ bar

    event.target.setAttribute('data-foo', 'baz');
    console.log(event.target.getAttribute('data-foo')); // 👉️ baz
  };

  return (
    <div>
      {/* 👇️ set data-test-id attribute */}
      <button onClick={handleClick} data-test-id="my-btn">
        Click
      </button>
    </div>
  );
}
```

![react-set-data-attribute.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd339250e29d4869aed801533c056a6e~tplv-k3u1fbpfcp-watermark.image?)

> 如果你需要通过`ref`而不是通过`event`对象来访问元素，请往下翻阅。
> 

## event对象

我们可以通过`data-*` 语法来直接在元素上设置`data`属性。

```jsx
<button onClick={handleClick} data-test-id="my-btn">
  Click
</button>
```

需要注意的是，我们不要驼峰命名自定义`data-*` 属性。

这个例子向我们展示了如何在事件中，以编程方式来使用`setAttribute()`方法进行设置或者更新`data`属性。

```jsx
event.target.setAttribute('data-foo', 'bar');
```

该方法接收以下两个参数：

1. `name` - 要设置的属性的名称。
2. `value` - 赋值给属性的值。

> 如果属性已经存在于元素上，那么属性值将会被更新。否则将添加具有指定名称和值的新属性。
> 

如果需要从元素上移除一个属性，可以使用`removeAttribute`方法。

```jsx
el.removeAttribute('data-foo');
```

`removeAttribute`方法从元素中删除具有指定名称的属性。如果元素上不存在该属性，那么此方法直接返回而不抛出错误。

`event`上面的`target`属性给了我们一个对触发事件的元素的引用（可以是后代元素）。

```jsx
const handleClick = event => {
  console.log(event.target.dataset);

  // 👇️ "my-btn"
  console.log(event.target.getAttribute('data-test-id'));

  // 👇️ set attribute
  event.target.setAttribute('data-foo', 'bar');
  console.log(event.target.getAttribute('data-foo')); // 👉️ bar

  event.target.setAttribute('data-foo', 'baz');
  console.log(event.target.getAttribute('data-foo')); // 👉️ baz
};
```

> 而`event`上的`currentTarget`属性让我们访问事件监听器所连接的元素。
> 

如果`target`属性在你的方案中指的是一个子元素，而你需要访问事件监听器所连接的元素，只需用`currentTarget`替换`target`。

```jsx
const handleClick = event => {
  console.log(event.currentTarget.dataset);

  // 👇️ "my-btn"
  console.log(event.currentTarget.getAttribute('data-test-id'));

  // 👇️ set attribute
  event.currentTarget.setAttribute('data-foo', 'bar');
  console.log(event.currentTarget.getAttribute('data-foo')); // 👉️ bar

  event.currentTarget.setAttribute('data-foo', 'baz');
  console.log(event.currentTarget.getAttribute('data-foo')); // 👉️ baz
};
```

## useRef

另外，你也可以使用`ref`来访问DOM元素，来设置其`data`属性。

```jsx
import {useRef} from 'react';

export default function App() {
  const ref = useRef(null);

  const handleClick = () => {
    console.log(ref.current.dataset);

    // 👇️ "my-btn"
    console.log(ref.current.getAttribute('data-test-id'));

    // 👇️ set attribute
    ref.current.setAttribute('data-foo', 'bar');
    console.log(ref.current.getAttribute('data-foo')); // 👉️ bar

    ref.current.setAttribute('data-foo', 'baz');
    console.log(ref.current.getAttribute('data-foo')); // 👉️ baz
  };

  return (
    <div>
      <button ref={ref} onClick={handleClick} data-test-id="my-btn">
        Click
      </button>
    </div>
  );
}
```

上面示例实现的结果都是相同的，只不过我们使用了`ref`来访问DOM元素。

`useRef()`钩子可以传递一个初始值作为参数。该钩子返回一个可变`ref`对象，其`.current`属性被初始化为传递的参数。

> 需要注意的是，我们必须访问`ref`对象上的`current`属性，才能访问设置了`ref`属性的`button`元素。
> 

当我们为元素传递`ref`属性时，比如说，`<button ref={myRef} />` ，React将`ref`对象上的`.current`属性设置为对应的DOM节点。

`ref`上的`current`属性可以让我们访问`button`元素，所以我们可以在元素上使用如下方式来设置`data`属性，`ref.current.setAttribute('data-foo', 'bar')` 。

请确保在`useEffect`钩子内部或者事件发生时访问`ref` 。因为如果尝试立即访问`ref`的话，它也许尚未建立，或者当前元素还不存在于DOM中。