# React技巧之将CSS作为props传递

原文链接：[https://bobbyhadz.com/blog/react-pass-style-as-props-typescript](https://bobbyhadz.com/blog/react-pass-style-as-props-typescript)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## React.CSSProperties

在React TypeScript中使用`React.CSSProperties`类型来作为props传递CSS样式。比如：`style: React.CSSProperties;` 。`CSSProperties` 被用于类型声明`style`对象，其由CSS属性名称和值组成。

```tsx
// App.tsx

import React from 'react';

type ButtonProps = {
  // 👇️ type as React.CSSProperties
  style: React.CSSProperties;
  children: React.ReactNode;
};

function Button({style, children}: ButtonProps) {
  return <button style={style}>{children}</button>;
}

const App = () => {
  return (
    <div>
      <Button
        style={{padding: '2rem', fontSize: '3rem', backgroundColor: 'lime'}}
      >
        Click
      </Button>

      <h2 style={{fontSize: '3rem'}}>Hello world</h2>
    </div>
  );
};

export default App;
```

上述示例，我们把`style`对象类型声明为`React.CSSProperties`。

> 当给`Button`组件传递样式时，会自动补全属性名称。
>

你可以通过使用你的IDE，来弄清楚特定prop所期望的类型是什么。

![style-prop-cssproperties.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b7b5a318f7641cf9c8d77d4f0bbfafd~tplv-k3u1fbpfcp-watermark.image?) 

在大多数IDE中，你可以将鼠标悬停在prop上，看到prop的值。style prop的定义显示，它的类型是`CSSProperties`或`undefined`。

### HTML元素扩展

你可能还需要在一个组件的props中扩展一个HTML元素。

```tsx
// App.tsx

// 👇️ extend button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style: React.CSSProperties;
  children: React.ReactNode;
}

function Button({style, children}: ButtonProps) {
  return <button style={style}>{children}</button>;
}

const App = () => {
  return (
    <div>
      <Button
        style={{padding: '2rem', fontSize: '3rem', backgroundColor: 'lime'}}
      >
        Click
      </Button>

      <h2 style={{fontSize: '3rem'}}>Hello world</h2>
    </div>
  );
};

export default App;
```

该示例向我们展示了，如何在自定义组件的`props`中扩展一个`button`元素。我们在组件的`props`中使用`React.ButtonHTMLAttributes`类型来扩展`button`元素。

> 你可以在接口中添加自定义props，你的组件可以传递任何特定元素的props。
>

上述示例中，`Button`组件可以被传递任何特定的button props。如果你需要一个更广泛的类型，你可以使用`HTMLAttributes`类型来代替。

其他常用的扩展类型有`InputHTMLAttributes`, `TextareaHTMLAttributes`, `LabelHTMLAttributes`, `SelectHTMLAttributes`, `AnchorHTMLAttributes`, `CanvasHTMLAttributes`, `FormHTMLAttributes`, `ImgHTMLAttributes`等等。

需要注意的是，我们在例子中把`HTMLButtonElement`类型传递给了`ButtonHTMLAttributes`泛型。

> 类型被统一命名为`HTML***Element`。一旦你开始输入`HTML...`，你的IDE应该能够用自动完成来帮助你。
>

一些常用的类型有：`HTMLInputElement`, `HTMLButtonElement`, `HTMLAnchorElement`, `HTMLImageElement`, `HTMLTextAreaElement`, `HTMLSelectElement` 等等。
