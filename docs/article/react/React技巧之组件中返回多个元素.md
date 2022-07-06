# React技巧之组件中返回多个元素

原文链接：[https://bobbyhadz.com/blog/react-return-multiple-elements](https://bobbyhadz.com/blog/react-return-multiple-elements)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## fragment

使用React `fragment`从组件中返回多个元素。比如说，`<><div>First</div><div>Second</div></>` ，当我们需要在不向DOM添加额外节点的情况下，对一个子元素列表进行分组时，就会用到React Fragments。

```jsx
export default function App() {
  return (
    <>
      <div>First</div>
      <div>Second</div>
    </>
  );
}
```

我们使用了一个React`fragment`来分组一个子元素的列表，而没有向DOM添加额外的节点。

![return-multiple-elements.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68ac3becb50145e0939ed22eaff2c765~tplv-k3u1fbpfcp-watermark.image?)

> 该截图显示，我们的相邻`div`元素已经被添加到DOM中，而没有被包裹在一个额外的DOM节点中。
> 

你也可能会看到更多的`fragments` 语法。

```jsx
import React from 'react';

export default function App() {
  return (
    <React.Fragment>
      <div>First</div>
      <div>Second</div>
    </React.Fragment>
  );
}
```

上面的两个示例会取得相同的结果。他们都对一个子元素的列表进行分组，而没有向DOM添加额外的节点。

> 现在大多数代码编辑器都支持更简明的语法，所以更常用。
> 

然而需要注意的是，如果你必须要给`fragment`传递`key`属性，你就必须使用更为详细的语法。

```jsx
import React from 'react';

export default function App() {
  const arr = ['First', 'Second'];

  return arr.map(element => {
    return (
      <React.Fragment key={element}>
        <div>{element}</div>
      </React.Fragment>
    );
  });
}
```

如果你使用了简写`fragment`语法`<> </>` ，你将无法给`fragment`传递任何属性。

## DOM

> 另一种解决方案是将子元素包裹在另一个DOM元素中，例如`div`。
> 

```jsx
export default function App() {
  return (
    <div>
      <div>First</div>
      <div>Second</div>
    </div>
  );
}
```

这样就会解决无法传递属性的问题。因为我们没有返回多个元素，而是返回一个包含多个子元素的`div`元素。

> 在React组件中，我们必须只返回单个元素。因为从函数中返回多个值是无效语法。
> 

React组件只是函数，所以当我们在同一级别返回多个元素时，我们实际上是在函数的同一级别使用多个`return`语句。

```jsx
function render() {
  return React.createElement('div', null, 'First');
  return React.createElement('div', null, 'Second');
}
```

第二个`return`语句是不可达的，并且属于无效语法。

另一方面，当我们使用`fragment`或者其他元素来包裹元素时，该函数只返回一个带有多个子元素的单一值，这样便解决了错误。