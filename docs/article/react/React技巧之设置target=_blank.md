# React技巧之设置target=_blank

原文链接：[https://bobbyhadz.com/blog/react-set-target-blank](https://bobbyhadz.com/blog/react-set-target-blank)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 设置target=_blank

在React中将元素的`target`属性设置为`_blank` ，可以使用锚元素并设置`rel`属性。比如说，`<a href="https://example.com" target="_blank" rel="noopener noreferrer">` 。`_blank` 值意味着资源在新的标签页被加载。

```jsx
export default function App() {
  const openInNewTab = url => {
    // 👇️ setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      {/* 👇️ setting target to _blank on a link */}
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Example.com
      </a>

      <hr />

      <button onClick={() => openInNewTab('https://example.com')}>
        Example.com
      </button>
    </div>
  );
}
```

需要注意的是，当设置`target`属性为`_blank`时，需要将`rel`属性设置为`noopener noreferrer` 。

rel属性的`noopener` 关键字指示浏览器导航到目标资源，而不授予新的浏览上下文对打开它的文档的访问权。

当`a`标签元素的`target`属性被设置为`_blank`时，资源在新的标签页被加载。

```jsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Example.com
</a>
```

或者说，当使用`window.open()` 函数时，你可以将`target`属性设置为`_blank`。

```jsx
export default function App() {
  const openInNewTab = url => {
    // 👇️ setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <button onClick={() => openInNewTab('https://example.com')}>
        Example.com
      </button>
    </div>
  );
}
```

`window`对象上的`open()`方法加载指定的资源到新的或者已存在的标签页。

我们将以下3个参数传递给`open()`方法：

| 名称 | 描述 |
| --- | --- |
| url | 被加载的资源的url或者路径 |
| target | 资源被加载到的浏览器上下文的名称。_blank 属性值意味着资源在新的标签页被加载。 |
| windowFeatures | 一个用逗号分隔的窗口特征列表。在例子中用于增加安全性。 |

当用户点击`button`按钮时，我们为`onClick`属性传递的函数将被执行，并且指定页将会在新标签页加载。

## 总结

通过设置`target`属性为`_blank`，我们在新标签页中打开了资源。一共介绍了两种方式：一种是为`a`标签元素设置属性，另一种是为`window.open()`方法传入参数。
