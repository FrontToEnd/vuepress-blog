# React技巧之设置onClick监听器

原文链接：[https://bobbyhadz.com/blog/react-onclick-link](https://bobbyhadz.com/blog/react-onclick-link)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，在链接上设置`onClick`监听器：

1. 在链接上设置`onClick`属性。
2. 每当链接被点击时，传递给`onClick`属性的函数将会被调用。

```jsx
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function App() {
  const handleLinkClick = event => {
    console.log('Link clicked');

    // 👇️ refers to the link element
    console.log(event.currentTarget);
  };

  const handleAnchorClick = event => {
    // 👇️ use event.preventDefault() if you want to
    // prevent navigation
    // event.preventDefault();

    console.log('Anchor element clicked');

    // 👇️ refers to the link element
    console.log(event.currentTarget);
  };
  return (
    <Router>
      <div>
        {/* 👇️ react router link */}
        <Link onClick={handleLinkClick} to="/about">
          Go to About
        </Link>

        <br />
        <br />

        {/* 👇️ Anchor link */}
        <a
          onClick={handleAnchorClick}
          href="https://google.com"
          target="_blank"
          rel="noreferrer"
        >
          Google.com
        </a>
      </div>
    </Router>
  );
}
```

![react-link-onclick.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c967d610a75642b68814395623a2aa3a~tplv-k3u1fbpfcp-watermark.image?)

上述代码片段向我们展示了，如何在React router的`Link`组件，以及锚点元素上设置`onClick`事件监听器。

每当链接被点击时，`handleClick`函数将会被调用。

> 如果需要在`handleClick` 函数中访问链接元素，可以通过访问`event`对象上的`currentTarget`属性来获得。
> 

`event`对象上的`currentTarget` 属性，使我们能够访问事件监听器所附加的元素。而event上的`target`属性，为我们提供了触发事件的元素的引用(可能是后代元素)。

如果你想为`handleClick` 函数传递参数，将`onClick`属性设置为行内箭头函数。

```jsx
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function App() {
  const handleLinkClick = (event, message) => {
    console.log('Link clicked');
    console.log(message);
  };

  const handleAnchorClick = (event, message) => {
    // 👇️ use event.preventDefault() if you want to
    // prevent navigation
    // event.preventDefault();

    console.log('Anchor element clicked');
    console.log(message);
  };
  return (
    <Router>
      <div>
        {/* 👇️ react router link */}
        <Link onClick={event => handleLinkClick(event, 'hello')} to="/about">
          Go to About
        </Link>

        <br />
        <br />

        {/* 👇️ Anchor link */}
        <a
          onClick={event => handleAnchorClick(event, 'world')}
          href="https://google.com"
          target="_blank"
          rel="noreferrer"
        >
          Google.com
        </a>
      </div>
    </Router>
  );
}
```

请注意，我们为`onClick`属性传递了一个函数，而不是函数调用的结果。如果将函数传递给`onClick`属性并调用了该函数，比如说，`onClick={handleClick()}` ，当组件挂载时，它将被立即调用。

你也可以在其他元素上使用该方式设置`onClick`属性，比如说`button`元素，`span`元素等等。