# React技巧之发出http请求

原文链接：[https://bobbyhadz.com/blog/react-send-request-on-click](https://bobbyhadz.com/blog/react-send-request-on-click)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

在React中，通过点击事件发出http请求：

1. 在元素上设置`onClick`属性。
2. 每当元素被点击时，发出http请求。
3. 更新`state`变量，并重新渲染数据。

> 如果你使用`axios`，请向下滚动到下一个代码片段。
> 

```jsx
import {useState} from 'react';

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Smith',
          job: 'manager',
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Make request</button>

      {isLoading && <h2>Loading...</h2>}

      {data && (
        <div>
          <h2>Name: {data.name}</h2>
          <h2>Job: {data.job}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
```

![react-make-request-on-click.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86c69101c08d4ec6b822c70dd353fe7a~tplv-k3u1fbpfcp-watermark.image?)

## fetch

上述示例向我们展示了，在React中，如何通过点击按钮发送HTTP `POST` 请求。

我们在`button`元素上设置了`onClick`属性，因此每当按钮被点击时，`handleClick`函数将会被调用。我们通过`async`关键字标记了`handleClick`函数，因此我们可以使用`await`关键字来等待内部的Promise返回。

> 在`handleClick`函数中，我们等待`POST`请求的完成并更新`state`变量。
> 

该示例使用了原生的 `fetch` API，但如果你使用`axios`依赖包，这个概念也适用。

## axios

下面是如何使用`axios`包在点击按钮时发出http `POST`请求。

如果你决定使用`axios`，请确保你已经通过运行`npm install axios`安装了该软件包。

```jsx
import {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        'https://reqres.in/api/users',
        {name: 'John Smith', job: 'manager'},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Make request</button>

      {isLoading && <h2>Loading...</h2>}

      {data && (
        <div>
          <h2>Name: {data.name}</h2>
          <h2>Job: {data.job}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
```

![react-make-request-on-click.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86c69101c08d4ec6b822c70dd353fe7a~tplv-k3u1fbpfcp-watermark.image?)

上述示例向我们展示了，如何使用`axios`在点击按钮时，发出http `POST` 请求。

> 如果你使用`axios`，请确保你已经在项目的根目录下运行`npm install axios`来安装该包。
> 

使用`axios`包时的语法更简洁一些，我们要处理的实现细节也更少，但概念是一样的。

我们必须在一个按钮元素上设置`onClick`属性，并在每次点击按钮时发出一个HTTP请求。