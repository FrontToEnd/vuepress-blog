# React技巧之重定向表单提交

原文链接：[https://bobbyhadz.com/blog/react-redirect-after-form-submit](https://bobbyhadz.com/blog/react-redirect-after-form-submit)

作者：[Borislav Hadzhiev](https://bobbyhadz.com/about)

正文从这开始~

## 总览

使用React Router重定向表单提交：

1. 使用`useNavigate()`钩子，比如说，`const navigate = useNavigate();`
2. 调用`navigate()`函数，并传入路径 - `navigate('/contacts')`
3. `navigate()`函数让我们以编程的方式进行导航。

```jsx
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    // 👇️ redirect to /contacts
    navigate('/contacts');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input />
      <button type="submit">Submit</button>
    </form>
  );
}

export default function App() {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

function Contacts() {
  return <h2>Contacts</h2>;
}
```

![react-redirect-on-form-submit.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea6582a030ab4947bd823b71a5c58afd~tplv-k3u1fbpfcp-watermark.image?)

## 详情

`useNavigate` 钩子返回函数，让我们以编程的方式进行导航。比如`form`表单被提交后或者按钮被点击后。

`navigate` 函数可以被传递一个数值。比如说，1表示返回上一页，1表示前进一页或一个路径，例如`navigate('/about')`。该函数也接收一个`options`对象。

```jsx
const handleSubmit = event => {
  event.preventDefault();

  // 👇️ redirect
  navigate('/contacts', {replace: true});
};
```

当在`options`对象中设置`replace`属性为`true`时，历史堆栈中的当前条目被替换为新条目。

> 换句话说，导航到新的路由，并不会将新的条目推入到历史堆栈。所以如果用户点击后退按钮，他们将无法导航到前一个页面。
>

这是很有用的。举个例子，当用户登录成功后，你不想让用户点击后退按钮，然后回到登录页面时，就可以使用`replace`配置。或者，你有一个路由需要重定向到其他页面时，你不想让用户点击后退按钮，然后再次重定向，也可以使用`replace`配置。

要在你的应用程序中使用`useNavigate`钩子，请确保`index.js`文件里的`App`组件包裹在`Router`组件中。

```jsx
import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ wrap App in Router
root.render(
  <Router>
    <App />
  </Router>
);
```

> 用`Router`组件包装你的React应用程序的最佳位置是在你的`index.js`文件中，因为那是你的React应用程序的入口点。
>

一旦整个应用程序被`Router`组件包裹，你可以在你的组件中的任何地方使用 react router 包中的任何钩子。
