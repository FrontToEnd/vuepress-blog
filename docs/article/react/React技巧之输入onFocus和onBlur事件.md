# React技巧之输入onFocus和onBlur事件


原文链接：[https://bobbyhadz.com/blog/typescript-react-onfocus-onblur-event-type](https://bobbyhadz.com/blog/typescript-react-onfocus-onblur-event-type)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

在React中，使用`React.FocusEvent<HTMLElement>` 类型来类型声明`onFocus`和`onBlur`事件。`FocusEvent`接口用于`onFocus`和`onBlur`事件。

```tsx
// App.tsx

import React from 'react';

const App = () => {
  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    console.log(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    console.log(event);
  };

  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        defaultValue=""
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default App;
```

我们将事件类型声明为`React.FocusEvent<HTMLElement>`，因为`FocusEvent`类型用于React中的`onFocus`和`onBlur`事件。

然而，我们在输入事件时可以更具体一些。找出事件类型的最简单方法是内联编写事件处理，并将鼠标悬停在函数中的`event`参数上。

```tsx
const App = () => {
  // 👇️ events are written inline
  // hover over the `event` parameter with your mouse

  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        defaultValue=""
        onFocus={event => console.log(event)}

        onBlur={event => console.log(event)}
      />
    </div>
  );
};

export default App;
```

当事件被内联写入时，TypeScript能够推断出事件的类型。这是非常有用的，因为它适用于所有事件。只需编写内联事件处理程序的“模拟”实现，并将鼠标悬停在`event`参数上来获取其类型。

一旦知道了事件的类型，就能够提取处理函数并正确地类型声明它。

现在我们知道了示例中`onFocus`和 `onBlur`的正确类型，是`React.FocusEvent<HTMLInputElement, Element>` 。我们可以提取我们的处理函数。

```tsx
import React from 'react';

const App = () => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    console.log(event);
  };

  return (
    <div>
      <input
        type="text"
        id="message"
        name="message"
        defaultValue=""
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default App;
```

我们传递给`FocusEvent`泛型的类型是`HTMLInputElement`，因为我们将事件附加到一个`input`元素，但是你可以将事件附加到一个不同的元素上。

> 这些类型被一致命名为`HTML***Element`。一旦你开始输入`HTML...`，你的IDE应该能够用自动完成来帮助你。
>

一些常用的类型有：`HTMLInputElement`, `HTMLButtonElement`, `HTMLAnchorElement`, `HTMLImageElement`, `HTMLTextAreaElement`, `HTMLSelectElement` 等等。

注意，你可以使用这种方法获取所有事件的类型，而不仅仅是`onFocus`和 `onBlur`事件。只要你内联编写事件处理函数，并将鼠标悬停在`event`参数上，TypeScript就能推断出事件的类型。
