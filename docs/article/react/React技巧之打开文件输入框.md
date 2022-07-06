# React技巧之打开文件输入框

原文链接：[https://bobbyhadz.com/blog/react-open-file-input-on-button-click](https://bobbyhadz.com/blog/react-open-file-input-on-button-click)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，通过点击按钮，打开文件输入框：

1. 在`button`元素上设置`onClick`属性。
2. 在文件输入框上设置`ref`属性。
3. 当按钮被点击时，打开文件输入框。比如说，`inputRef.current.click()` 。

```jsx
import {useRef} from 'react';

const App = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  return (
    <div>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />

      <button onClick={handleClick}>Open file upload box</button>
    </div>
  );
};

export default App;
```

![open-file-input-on-button-click.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be6e399d7d564070814284c4484aed52~tplv-k3u1fbpfcp-watermark.image?)

## click

我们使用`useRef`钩子访问文件`input`元素。需要注意的是，我们必须访问`ref`对象上的`current`属性，以获得对我们设置`ref`属性的文件`input`元素的访问。

当我们将`ref`属性传递到元素上时，比如说，`<input type="file" ref={myRef} />` 。React将`ref`对象的`.current`属性设置为相应的DOM节点。

我们调用了`click()`方法，比如：`ref.current.click()` 。以此来模拟`input`元素上的鼠标点击事件。

> 当对一个元素使用`click()`方法时，它会触发该元素的点击事件。当一个文件`input`的点击事件被触发时，文件上传对话框就会打开。
> 

需要注意的是，我们对`input`元素的`display`属性设置为`none`，来隐藏该元素。

现在，当用户点击`button`元素时，我们在`input`元素上使用`ref`对象来模拟`click`事件，并且文件上传对话框会被打开。

## 总结

该方法可以在任何类型元素上生效，比如说`div`或者一个图标。只需在元素上设置`onClick`属性，当元素被点击时，就可以文件`input`上模拟点击。