# 使用Vue3 + Vite + Pinia创建SPA

原文链接：[https://labs.pineview.io/learn-how-to-build-test-and-deploy-a-single-page-app-with-vue-3-vite-and-pinia/](https://labs.pineview.io/learn-how-to-build-test-and-deploy-a-single-page-app-with-vue-3-vite-and-pinia/)

作者：[Andrei Rusu](https://labs.pineview.io/author/andrei/)

正文从这开始~

## 介绍

诞生于2014年的Vue.js，无疑是目前领先的前端框架之一，随着社区的发展以及生态系统的壮大，在相当一段时间内，它的低位都是稳固的。几年前我曾在个别项目中使用过Vue 2，那是一种令人愉快的体验。

我觉得是时候把我的工具集升级到最新版本了。与此同时，也要升级诸如`Vite`和`Pinia`的新型工具。

本篇指南将涵盖详尽的步骤，使用Vue 3来创建一个功能性的书店SPA实例，并使用`Vite`来运行它。它还包括如何使用`Pinia`（`Vuex`的后继者）添加状态管理，以及如何使用`Vue Router`进行路由管理的细节。

将涵盖的核心概念有：

- 使用Vite创建Vue 3单页应用(SPA)
- 使用Vue Router管理路由
- 使用Pinia管理应用状态
- 使用VIte运行、构建、发布应用
- 编写、运行Vue组件单元测试
- 使用Nightwatch.js编写、运行自动化的端到端测试

这似乎看起来有很多内容，但我认为完全有可能在20分钟内完成所有。上面列出的一些概念可以扩展成单独的完整教程，但这里我只涵盖了启动和运行项目所必需的内容。

最后需要提到的是，本教程不涉及到后端。尽管数据是使用浏览器的`Fetch API`（XHR的后继者）加载的，但本身是没有服务端组件的。也就是说，可以很容易地添加一个后端组件。

总体而言，我们即将在这里构建的应用程序可以作为一个静态网站部署。如果你渴望马上开始编程，并立刻投入其中，你可以直接使用以下方法来启动和运行该项目：

```sh
git clone <https://github.com/beatfactor/middlemarch>
npm install
npm run dev
```

或者在Github上fork本项目： [https://github.com/beatfactor/middlemarch](https://github.com/beatfactor/middlemarch)

## 步骤一：使用create-vite脚手架工具设置应用程序

我们将要使用官方脚手架工具`create-vite`来设置项目架构，因此你要确保已经安装了`Node 12+`与`NPM 6+`。脚手架工具也支持`Yarn`和`PNPM`作为包管理器，但这里我们只涉及`NPM`。

`create-vite`会为你创建项目文件夹，所以首先要确保使用`cd`命令进入到符父文件夹：

```sh
cd /workspace
```

使用以下命令安装`Vite`并初始化项目：

```sh
$ npm init vite@latest
```

然后你会被提示输入项目名称并选择你想要使用的库。我们从列表中选择vue：

```sh
~/workspace % npm init vite@latest
npx: installed 6 in 1.051s
✔ Project name: … vue-bookstore
? Select a framework: › - Use arrow-keys. Return to submit.
    vanilla
❯   vue
    react
    preact
    lit
    svelte
```

然后选择vue作为变量，因为我们这里不使用`TypeScript` ：

```sh
? Select a variant: › - Use arrow-keys. Return to submit.
❯   vue
    vue-ts
```

你应该会看到如下输出：

```sh
npx: installed 6 in 1.051s
✔ Project name: … vue-bookstore
✔ Select a framework: › vue
✔ Select a variant: › vue

Scaffolding project in /Users/andrei/workspace/vue-bookstore...

Done. Now run:

  cd vue-bookstore
  npm install
  npm run dev
```

一旦我们按照上述说明进行操作，我们将从`Vite`得到以下输出，来告诉我们该应用正在运行。

```sh
vite v2.7.7 dev server running at:

> Local: <http://localhost:3000/>
> Network: use `--host` to expose

ready in 611ms.
```

访问[localhost:3000](http://localhost:3000)，欢迎页面会像下面这样：

![welcome.png](<https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4eb47ea8f9154aa4864429bfe362ea8d~tplv-k3u1fbpfcp-watermark.image?)>)

## 步骤二：添加路由和状态管理

我们先来看下由`create-vite`创建的项目目录结构：

```sh
vue-bookstore/
 ├── public/
 |    ├── favicon.ico
 ├── src/
 |    ├── assets/
 |    |    └── logo.png
 |    ├── components/
 |    |    └── HelloWorld.vue
 |    ├── App.vue
 |    └── main.js
 ├─── package.json
 ├─── README.md
 └─── vite.config.js
```

在本篇指南的本节中，将要为我们的项目添加两个新的依赖：`vue-router` 和 `pinia` 。首先使用NPM来安装他们。

### Vue Router

`vue-router`是`Vue.js`官方的路由管理工具。我们需要安装v4来兼容Vue 3：

```sh
$ npm install vue-router@4 --save
```

### Pinia

`Pinia`是`Vue`生态系统中新涌现的项目之一，它是Vue.js应用程序最新的官方状态管理工具。它的API与`Vuex`（其前身）非常相似，它被设计得更快速、更轻量。

可以使用NPM来安装`Pinia` ：

```sh
$ npm install pinia --save
```

### 设置路由

如果你不熟悉在SPA中使用路由或者状态管理工具，不要担心；这两个概念都非常容易理解，一旦你看到它是如何工作的，他们就会自行解释。

另外请谨记，在这里我们只是创建一个教程，目标是在20分钟内完成所有工作并运行。这并不要求我们学习Vue.js所有的相关知识。

### 什么是单页面应用（SPA）？

既然我们在这里构建的是SPA，那么考虑一下这意味着什么，以及什么是单页面，这也许是有用的。

> 单页面应用只是一个web应用，当你导航到另一个子页面时，它不会重新加载页面。不过浏览器的url会被修改，就好像页面被重新加载一样，这是使用`HTML5`的`History API`做到的。

### 在Vite中使用Vue组件

使用create-vite脚手架工具创建的项目，默认添加了一个非常基础的vue组件，位于`src/components/HelloWorld.vue` 。然后它被用在位于`src/App.vue`的主应用组件中。

这里还有另外两个很重要的文件：

-   **index.html**
-   **src/main.js**

`index.html`文件是当浏览器导航到我们应用程序页面时看到的内容，`main.js`是Vue.js应用程序的入口。

下面是这些文件的内容：

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**src/main.js**

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 添加路由

现在是时候创建我们应用程序的主路由了。在Vue中，每一个路由必须与一个组件相对应。在当前应用程序中，我们将考虑每个子页面的一个组件，就像这样：

-   **Homepage** - 我们的书店主页面
-   **Cart** - 购物车和结算页面
-   **Sign-In** - 用户登录页面

既然这只是一个示例，像用户注册、产品详情等其他页面，将会被忽略。而且，登录页面只包含一个模拟登录。

对于基础的`HTML`和`CSS`，我使用`Bootstrap 5`做了一些事情，比如UI下拉菜单和表单。当然你可以使用任何你想用的UI库。

我们将暂时创建空的页面组件，好让我们可以设置路由。新的src目录结构将会长这样（稍后将移除样板代码）：

```sh
src/
  ├── components/
  |    └── TopNavbar.js
  ├── lib/
  |    ├── router.js   
  |    └── store.js
  ├── pages/
  |    ├── cart/
  |    |    ├── cart.css
  |    |    ├── cart.html
  |    |    └── Cart.vue
  |    ├── home/
  |    |    ├── home.css
  |    |    ├── home.html
  |    |    └── Home.vue
  |    ├── sign-in/
  |    |    ├── sign-in.css
  |    |    ├── sign-in.html
  |    |    └── SignIn.vue
  |    └── routes.js
  ├── App.vue
  └── main.js
```

我们添加了三个页面，每一个页面都非常基础。我们将添加`TobNavbar` 组件，使得路由导航生效，而不需要重新加载页面。

为`src/pages/cart/Cart.vue`、`src/pages/home/Home.vue`和`src/pages/sign-in/SignIn.vue`添加如下内容：

```js
<script setup>
import TopNavbar from '../../components/TopNavbar.vue';
</script>

<template>
  <TopNavbar />
</template>
<style></style>

<script>
export default {
  components: {
    TopNavbar
  },

  computed: {},
  
  mounted() {
  },
  
  data() {
    return {
    };
  },
};
</script>
```

`TobNavbar` 组件位于`src/components` ，只包含了路由导航链接。需要注意的是，`router-link`组件是`vue-router`的一部分：

```html
<template>
  <router-link to="/">Home</router-link>
  <router-link to="/cart/">Cart</router-link>
  <router-link to="/sign-in/">Sign In</router-link>
</template>
```

`pages/routes.js`文件包含了应用程序中所有的路由声明。如下所示：

```js
import {createRouter} from 'vue-router'
import Homepage from './home/Home.vue';
import SignIn from './sign-in/SignIn.vue';
import Cart from './cart/Cart.vue';

const routes = [
  {
    path: '/',
    component: Homepage
  },

  {
    path: '/sign-in/',
    component: SignIn
  },

  {
    path: '/cart/',
    component: Cart
  },
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}
```

在我们准备看到`vue-router`成功运行之前，我们只需要再做两件事：

1）创建路由并将其添加到`src/main.js`里的Vue应用程序实例中：

```js
import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'

import createRouter from './pages/routes.js'
import App from './App.vue'

const router = createRouter(createWebHistory())
const app = createApp(App)
app.use(router).mount('#app')
```

2）在`src/App.vue`里添加`<router-view>`组件：

```js
<template>
  <router-view></router-view>
</template>
```

如果需要的话，我们重新运行`npm run dev` ，然后导航到`http://localhost:3000` 。你将拥有一个启用了路由的Vue 3应用程序。

### 使用Pinia设置状态管理

我们继续。现在我们需要为我们的app设置`Pinia store`。`store`（仓库）是应用程序维护状态（state）的地方。

`Pinia`是Vue.js核心团队的一个新项目，现在是使用应用程序状态的推荐方法。如果你已经很熟悉`vuex`，那么适应`Pinia`将会非常简单。事实上，Pinia的API比`vuex`稍微简单一点，也更加简洁明了。

在vue3中使用Pinia，将会有一个根`store`以及任意数量的独立`store`。针对我们的书店app，我们将只使用两个`store`：

-   目录 store: 可用的书单
-   购物车 store: 用户想要订购的书籍

### 创建Pinia

我们需要创建第一个根`store`，并传递给vue实例。在`src/main.js`文件中进行代码更新，如下所示：

```js
import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import createRouter from './pages/routes.js'
import App from './App.vue'

const store = createPinia()
const router = createRouter(createWebHistory())
const app = createApp(App)

app.use(router).use(store).mount('#app')
```

接下来我们需要创建独立的目录store 以及购物车store，并在组件中使用他们。

### 添加目录store

创建一个Pinia store意味着两件主要的事情：

1.  定义store
1.  在一个或多个组件中使用store

**定义store**

和`Vuex`一样，`Pinia store`包含状态（state）以及两种类型的方法：**getters** 和 **actions**。

关于一个store需要考虑的事情：

-   `Getters`是一个同步方法，用来从状态中获取数据
-   `Actions` 可以是一个异步的方法，用来更新状态
-   `state`被定义为一个返回初始状态的函数

是时候在`src/stores/catalog.js`里面创建目录store了：

```js
import { defineStore } from 'pinia'

export const useCatalog = defineStore('catalog-store', {
  state: () => {
    return {
      newArrivals: [],
      fetching: false
    }
  },

  getters: {
    results(state) {
      return state.newArrivals;
    },

    isFetching(state) {
      return state.fetching;
    }
  },

  actions: {
    async fetchNewArrivals() {
      this.fetching = true;
      const response = await fetch('/data/new-arrivals.json');
      try {
        const result = await response.json();
        this.newArrivals = result.books;
      } catch (err) {
        this.newArrivals = [];
        console.error('Error loading new arrivals:', err);
        return err;
      }

      this.fetching = false;
    }
  }
})
```

查看上面的源码，你可以注意到我们有两个`getters`和一个`actions`。我们没有真正的后端，只有一个位于`/data/new-arrivals.json`的`json`文件。其中包含一些书籍，我们将把它们作为我们的目录。

你也可以注意到，我们的getters没有对数据做任何特殊的处理，导致他们有一点多余。但我认为用来展示如何定义他们也是不错的。

### 在模板文件中使用store

将上面的定义链接到模板文件也非常的简单。

让我们在`src/components/NewArrivals.vue`中创建一个叫做`NewArrivals`的新组件，我们将在`Home.vue`页面组件中使用它。

```js
<script setup>
import {useCatalog} from '../../store/catalog.js'
</script>

<template>

</template>

<style scoped></style>
<script>
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useCatalog, {newArrivals: 'results'})
  },

  methods: {
    ...mapActions(useCatalog, ['fetchNewArrivals']),

    addToCart() {
      // we'll populate this later
    }
  },

  created() {
    // when the template is created, we call this action
    this.fetchNewArrivals();
  }
};
</script>
```

`Home.vue` 组件将会变成：

```js
<script setup>
import TopNavbar from '../../components/TopNavbar.vue';
import NewArrivals from '../../components/NewArrivals.vue';
</script>

<template>
  <TopNavbar />
  <NewArrivals />
</template>

<style></style>

<script>
export default {
  components: {
    TopNavbar,
    NewArrivals
  },
  computed: {},
  mounted() {},
  data() {
    return {};
  },
};
</script>
```

下面是store和组件如何在应用程序中协同工作的图示：

![vue-pinia.001.png](<https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acd65d34648649efb045e76777144073~tplv-k3u1fbpfcp-watermark.image?)>)

我还为购物车写了一个store和一个组件，但我不会把它包含在教程中，因为机制是相似的。你可以在仓库中检查源代码，它包括了所有东西，甚至包括了一些样式。

## 步骤三：测试Vue.js组件

组件测试是UI测试中的一种。在这种测试中，组件被独立地进行渲染，没有其他的应用组件，目的是为了验证其功能。它通常是发生在端到端测试步骤之前的一种测试策略，我们将在下一小节进行阐述。

我们需要安装`Vue Test Utils` ，它是`Vue.js`的官方单元测试库。我们需要的是针对于Vue 3的那个版本。你可以从NPM上面进行安装：

```sh
npm install @vue/test-utils@next --save-dev
```

### 安装Nightwatch.js和ChromeDriver

我们将使用`Nightwatch.js` ，用于组件测试和端到端测试。`Nightwatch`已经是Vue.js团队推荐的测试框架之一，与`Vue`同一时间发布。

它最近通过[vite-plugin-nightwatch](https://www.npmjs.com/package/vite-plugin-nightwatch)获得了对Vue组件测试的支持。我们将继续安装`Nightwatch v2.0`。

```sh
npm install nightwatch --save-dev
```

我们还需要安装刚才提到的插件`vite-plugin-nightwatch` ：

```sh
npm install vite-plugin-nightwatch --save-dev
```

`Nightwatchs`使用 [W3C WebDriver API](https://w3c.github.io/webdriver/) 进行浏览器自动化任务，我们也需要安装`chromedriver` NPM包。因为我们将要使用Chrome来运行我们的测试用例。

```sh
npm install chromedriver --save-dev
```

### 测试`<NewArrivals>`组件

`vite-plugin-nightwatch`包含了一个测试渲染页面，`Nightwatch`已经包含了为我们的组件运行初始化测试所需的一切。

创建`test`文件夹，里面包含两个子文件：

-   `component` - 这将进行组件测试
-   `e2e` - 这将进行端到端测试

我们还需要`nightwatch.conf.js`配置文件，但是我们可以直接运行`Nightwatch` ，将会自动为我们创建配置文件。因此只需要确保`chromedriver`已经被安装。

确保当前的工作目录是项目的根目录，然后简单地运行一个与`Nightwatch`捆绑的测试实例。我们将选择`duckDuckGo`测试，因为它是最快的：

```sh
npx nightwatch examples/tests/duckDuckGo.js
```

现在项目结构看起来长这样：

```sh
vue-bookstore/
 ├── public/
 |    ├── data/
 |    └── favicon.ico
 ├── src/
 ├── ...
 |    └── main.js
 ├── test/
 |    ├── component/
 |    └── e2e/
 ├─── nightwatch.conf.js
 ├─── package.json
 ├─── README.md
 └─── vite.config.js
```

我们在`test/component`目录里面创建一个新文件叫做`newArrivalsTest.js` 。在这个js文件里，我们将添加一个基础的挂载组件的测试用例，检查返回的元素是否可以在页面中找到。

```js
describe('New Arrivals Component Test', function() {

  it('checks if the component has been mounted', async (browser) => {
    const component = await browser.mountVueComponent('/src/components/new-arrivals/NewArrivals.vue', {
      plugins: {
        router: '/src/lib/router.js'
      }
	});
    
    expect(component).to.be.present; 
  });
});
```
`Nightwatch`和`Mocha`一样，使用相同的`describe()` 语法。如果你已经很熟悉Mocha，你甚至可以使用它作为测试运行器，但我们现在不打算这么做。

是时候运行上述测试用例了，为此我们将使用`Chrome`浏览器运行`Nightwatch`，就像这样：

```sh
npx nightwatch test/component/newArrivalsTest.js --env chrome
```

这将打开Chrome浏览器，并且渲染这个组件，然后执行测试用例。如果你不喜欢在测试过程中看到弹出的浏览器窗口，你可以传入`--headless`参数，就像这样。

```sh
npx nightwatch test/component/newArrivalsTest.js --env chrome --headless
```

测试的输出如下所示：

```sh
[New Arrivals Component Test] Test Suite
──────────────────────────────────────────────────────────────
ℹ Connected to ChromeDriver on port 9515 (652ms).
  Using: chrome (97.0.4692.99) on MAC OS X.

  Running tests the component:
──────────────────────────────────────────────────────────────
  ✔ Expected element <web element{e53f9b1e-11d3-4dc4-8728-4d3cd077343e}> to be present (1ms)

OK. 1 assertions passed. (781ms)
```

当然，你可以通过以下方式来查阅`Nightwatch`运行器提供的所有CLI选项：访问[文档页面](https://nightwatchjs.org/guide/running-tests/command-line-options.html)或运行以下命令：

```sh
npx nightwatch --help
```

### 扩展`<NewArrivals>`测试

你可能已经注意到，我们的组件测试并没有测试很多东西，这意味着该测试并不像它能提供的那样有用。所以我们要继续对它进行一点点的扩展。

我们只需要检查`NewArrivals` 组件，并检查是否有一个叫做`newArrivals`的属性。该属性在HTML中被用来渲染结果。

现在测试用例看起来是这样的。我们重构了组件挂载到`before`钩子中，因此我们只能在测试内部进行检查，也就是`it`代码块。`expect`（断言）库是由`Nightwatch`提供的，它是基于流行的、多功能的`Chai.js`断言库。关于如何使用 `expect` 的更多信息，详见 [Nightwatch docs](https://nightwatchjs.org/api/expect/) 网站。

```js
describe('New Arrivals Component Test', function() {

  let component;

  before(async () => {
    component = await browser.mountVueComponent('/src/components/new-arrivals/NewArrivals.vue', {
      plugins: {
        router: '/src/lib/router.js'
      }
	})
  });

  it('checks if the component has been mounted', function(browser) {
    expect(component).to.be.present;
    expect(component).to.have.property('newArrivals');
	expect(component).text.toContain('The Memory Police')

    expect.elements('div.col-md-6').count.toEqual(4);       expect(component.property('newArrivals')).to.be.an('array').with.length(1);   
  });
});
```

## 步骤四：添加端到端测试

我们已经接近本教程的尾声，在我们认为拥有一个可以运行的Vue.js app之前，我们需要添加对端到端测试的支持，并在`Github Actions`上设置一个`CI pipeline`。

幸运的是，我们不需要安装、配置任何其他工具，除非是一些花里胡哨的报告器。但现在我们可以从`Nightwatch`中获得我们所需要的一切端到端的自动化测试。除了`Chrome`浏览器，`Nightwatch`也内置支持所有主流浏览器，包括 `Firefox、Edge、Safari`。这都要归功于它与`W3C Webdriver API`和`Selenium`的整合。它还允许你使用分布式云测试平台，比如[BrowserStack](https://www.browserstack.com/)、[SauceLabs](https://saucelabs.com/)、 [CrossBrowserTesting](https://crossbrowsertesting.com/) 、[LambdaTest](https://www.lambdatest.com/)等等。

### 编写Homepage端到端测试

我们从`homepage`端到端测试开始。创建一个新文件，位于`test/e2e/homePageTest.js` 。语法和组件测试的语法相同，但为了运行端到端测试，我们将使用应用程序的编译版本。

我们当然可以在开发环境中运行这些测试。但据我所知，软件开发中约定俗成的做法是，在一个尽可能模拟生产的环境中运行端到端测试。这也是为什么它们被称为端到端测试。

### 运行生产构建

为了运行生产构建，我们有几个选项，每个选项都涉及到运行`Vite`命令，它被含在`NPM`任务中。

1.  `npm run build` - 这将生成`index.html`以及其他静态资源。如果你已经有本地配置好的web server，你可以使用这个选项。
1.  `npm run preview` - 这将生成生产构建版本，并使用内置的dev server运行它。默认地址是[http://localhost:5000/](http://localhost:5000/)。

第二个选项更加简单直接，所以我们直接运行`preview`命令，看看会发生什么：

```sh
$ npm run preview

> vue-bookstore@0.0.0 preview /Users/andrei/workspace/vue-bookstore
> vite preview

  > Local: <http://localhost:5000/>
  > Network: use `--host` to expose
```

### 编写测试脚本

现在，我们有一个生产就绪的构建版本正在运行，我们可以在`test/e2e/homePageTest.js`中开始编写真正的测试用例。我们从小处着手，只写以下内容：

```js
describe('Homepage End-to-end Test', () => {

  it('tests if homepage is loaded', browser => {
    browser
      .navigateTo('<http://localhost:3000>')
      .assert.visible('#app .new-arrivals-panel')
      .expect.elements('#app .new-arrivals-panel .col-md-6').count.toEqual(4)
  });

  it('adds 2 volumes of "Rhinoceros and Other Plays" to cart', browser => {
    browser
      .click('.new-arrivals-panel .col-md-6:nth-child(2) button.add-to-cart')
      .click('.new-arrivals-panel .col-md-6:nth-child(2) button.add-to-cart')
      .assert.textEquals('.shopping-cart .badge', '2');
  });

  after(browser => browser.end());
});
```

该测试验证了`New Arrivals`面板是否显示在页面中，以及它是否包含我们已经看到的4个入口。

### 在Chrome中运行测试脚本

在Chrome中运行测试脚本的命令，与运行组件测试用例的命令非常相似：

```sh
npx nightwatch test/e2e/homePageTest.js --env chrome
```

输出如下所示：

```sh
[Homepage End-to-end Test] Test Suite
──────────────────────────────────────────────────────────────
ℹ Connected to ChromeDriver on port 9515 (2454ms).
  Using: chrome (97.0.4692.99) on MAC OS X.

  Running tests the homepage:
──────────────────────────────────────────────────────────────
  ✔ Testing if element <#app .new-arrivals-panel> is visible (157ms)
  ✔ Expected elements <#app .new-arrivals-panel .col-md-6> count to equal: "4" (18ms)

OK. 2 assertions passed. (765ms)
```

### 在Firefox中运行测试脚本

如果我们想要在`Firefox`浏览器中运行端到端测试，我们只需要安装[GeckoDriver](https://github.com/mozilla/geckodriver)。除非你想进一步定制，否则不需要其他配置就可以工作。

让我们继续，使用NPM来进行安装：

```sh
npm i geckodriver --save-dev
```

然后使用下面的命令运行`Nightwatch` ：

```sh
npx nightwatch test/e2e/homePageTest.js --env firefox
```

输出如下所示：

```sh
[Homepage End-to-end Test] Test Suite
──────────────────────────────────────────────────────────────
ℹ Connected to GeckoDriver on port 4444 (1737ms).
  Using: firefox (96.0.2) on MAC (20.6.0).

  Running tests the homepage:
──────────────────────────────────────────────────────────────
  ✔ Testing if element <#app .new-arrivals-panel> is visible (54ms)
  ✔ Expected elements <#app .new-arrivals-panel .col-md-6> count to equal: "4" (6ms)

OK. 2 assertions passed. (612ms)
```

### 在Safari中运行测试脚本

如果你在使用Mac，那么`safaridriver`可能已经安装了，这取决于你的`Safari`版本。

可以使用下面命令进行检查：

```sh
safaridriver --help
```

输出可能长这样：

```sh
Usage: safaridriver [options]
	-h, --help                Prints out this usage information.
	--version                 Prints out version information and exits.
	-p, --port                Port number the driver should use. If the server is already running, the port cannot be changed. If port 0 is specified, a default port will be used.
	--enable                  Applies configuration changes so that subsequent WebDriver                           sessions will run without further authentication.
	--diagnose                Causes safaridriver to log diagnostic information for all sessions hosted by this instance. See the safaridriver(1) man page for more details about diagnostic logging.
```

在`Safari`中运行你的第一个测试之前，你只需要通过以下命令启用自动化：

```sh
safaridriver --enable
```

然后使用下面命令简单的运行`Nightwatch`测试：

```sh
npx nightwatch test/e2e/homePageTest.js --env safari
```

### 在多个浏览器中并行运行

如果你需要在一个以上的浏览器中运行`Nightwatch`测试，你可以在多个浏览器中并行运行。

只需将浏览器作为逗号分隔的列表（没有空格）进行传递。

**在Firefox+Chrome中运行**

```sh
npx nightwatch test/e2e/homePageTest.js --env firefox,chrome
```

**在Firefox+Chrome+Safari中运行**

```sh
npx nightwatch test/e2e/homePageTest.js --env firefox,chrome,safari
```

更多关于并行测试的内容，请查看[Nightwatch docs](https://v2.nightwatchjs.org/guide/running-tests/parallel-running.html)网站。

## 步骤五：使用Github Actions启用持续集成（CI）

是时候进行收尾工作，将他们放在一起了。在`Github Actions`中启用持续部署（CD）之前，我们需要创建`npm test`任务。

### 创建npm test任务

现在我们已经在示例项目中具备组件测试和端到端测试。当然这只是一个最低水平，所以它没有涵盖所有内容，但我认为这是一个良好的开端。

告诉`Nightwatch`运行测试文件夹中的所有测试的最简单方法是，将文件夹作为第二个CLI参数。我们将要添加该命令到作为一个新的被称为`test`的NPM任务中。让我们编辑`package.json`文件，在 "`scripts` "字段中添加以下内容：

```js
"test": "nightwatch ./test"
```

我们可以像这样来运行NPM任务，并传递`Nightwatch`相关的CLI参数：

```sh
npm test -- --env chrome --headless
```

为了能在`Github Actions`中运行测试用例，我们将使用`--headless`模式。

### 添加Github Actions工作流

最后，我们可以添加`Github Actions`工作流。这样我们的测试就可以运行在每个推送和每个拉动请求上。

想要做到上述流程非常简单。我们将使用`Node.js`模板，在列表中添加几个新的步骤(step)，比如：

-   在后台启动dev server
-   在后台构建项目并在预览模式下启动dev server
-   在Chrome中使用无头模式运行组件以及端到端测试

创建`Github Actions`工作流程意味着，在`.github/workflows`文件夹中添加一个名为`node.js.yml`的新文件，内容如下所示。当你从`Github`项目导航到`Actions`部分并选择`Node.js`模板时，其中大部分内容都是自动生成的。

```yaml
name: Node.js CI

on:
  push:
    branches: [ main ]

  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x, 14.x]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - run: npm ci

      - name: Start vite dev server
        run: npm run dev &

      - name: Build the app
        run: npm run build
        
      - name: Start vite dev server in preview
        run: npm run preview &
        
      - name: Run Nightwatch tests
        run: npm test
```

这样就可以了。每当有新的`git`推送或新的PR被发送时，就会运行一个新的构建。构建将在2个独立的环境中运行，一个是`Node 12`，另一个是`Node 14`，如工作流中定义的那样。

### 今后的发展方向

该项目在`Github`上的网址是：[https://github.com/beatfactor/middlemarch](https://github.com/beatfactor/middlemarch)。 这里涵盖了所有的代码，还有一些样式和图片。它还包含了购物车的代码和一个模拟的结账页面。

![homepage.png](<https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8af03215c1334952a4a391250650e80a~tplv-k3u1fbpfcp-watermark.image?)>)

你可以通过常规步骤让它在你的本地机器上运行：

```sh
git clone <https://github.com/beatfactor/middlemarch>
npm install
npm run dev
```

欢迎发送PR或报告问题。