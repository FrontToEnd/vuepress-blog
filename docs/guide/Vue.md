# Vue规则

## 风格指南

点击[这里](https://cn.vuejs.org/v2/style-guide/)查看官方风格指南。

## 目录构建规范

```
── project-name
   ├── public                    项目公共目录
   │   ├── favicon.ico               Favourite 图标
   │   └── index.html                页面入口 HTML 模板
   ├── src                       项目源码目录
   │   ├── main.js                   入口js文件
   │   ├── App.vue                   根组件
   │   ├── api                       把所有请求数据的接口，按照模块在单独的JS文件中
   │   │   ├── home.js                   首页接口
   │   │   ├── detail.js                 详情页接口，等等
   │   │   ···
   │   ├── assets                    静态资源目录，公共的静态资源，图片，字体等
   │   │   ├── fonts                     字体资源
   │   │   ├── images                    图片资源
   │   │   ···
   │   ├── common                    公共脚本，样式，配置，等动态信息
   │   │   ├── js                        公共脚本
   │   │   │   │── utlis.js                  公共 JS 工具函数
   │   │   │   │── config.js                 公共配置
   │   │   │   ···
   │   │   ├── style                 公共样式，可以是各种预处理语言
   │   │   │   │── index.css                样式主文件
   │   │   │   │── reset.css                重置样式
   │   │   │   ···
   │   │   ···
   │   ├── components                公共组件目录
   │   │   ├── confirm                   弹框组件
   │   │   │   └── index.vue
   │   │   ├── scroll                    局部内容滚动组件
   │   │   │   └── index.vue
   │   │   ···
   │   ├── http                      封装的 HTTP 请求方法
   │   │   ├── axios.js                  Axios 的封装
   │   │   ├── jsonp.js                  JSONP 的封装
   │   │   ···
   │   ├── store                     数据中心
   │   │   ├── state.js                  state 数据源，数据定义
   │   │   ├── mutations.js              同步修改 state 数据的方法定义
   │   │   ├── mutation-types.js         定义 Mutations 的类型
   │   │   ├── actions.js                异步修改 state 数据的方法定义
   │   │   ├── getters.js                获取数据的方法定义
   │   │   └── index.js                  数据中心入口文件
   │   ├── routes                    前端路由
   │   │   └── index.js
   │   └── views                     页面目录，所有业务逻辑的页面都应该放这里
   │       ├── home                      应用首页
   │       │   └── index.vue
   │       ···
   ├── .env.development              Vue 开发环境的配置
   ├── .env.production               Vue 生成环境的配置
   ├── .eslintrc.js                  Eslint 配置文件
   ├── .gitignore                    Git 忽略文件
   ├── package.json                  包依赖文件
   ├── package-lock.json             依赖包版本管理文件
   ├── README.md                     项目介绍
   ├── vue.config.js                 vue/cli 项目脚手架配置
   ···
```

## src 文件说明

* src/api 模块的请求方法。应该参考 src/views 中的直接子文件夹的结构，做映射。
* src/assets 项目的静态资源文件。虽然是静态文件(图片，字体，等)，但是还是经过 webpack 处理会好一些，因为有些比较小的文件会被打包到文件，减少请求和压缩第三方包。这个模块的文件，如果还需要扩展，一个单词作为文件夹名字！保持简洁性。
* src/common 公共的动态的脚本、样式。在实际中，样式可能是各种预处理语言写的，请自行组织目录结构。
* src/components 公共组件。放置项目中抽象的基础和业务组件。你应该为每个组件都单独建一个文件夹，以做好组件之间的隔离，并且有一个默认的文件：index.vue 文件，以便引入组件时少写几个字母。默认组件中的文件是一个最小的单位，不应该有依赖其他组件，或操作 state 状态等行为。
* src/http 主要是关于请求方法的封装。建议开发过程中不要修改，因为会影响到全局。
* src/store 数据中心。这部分内容比较多，独立出来，详情参考：数据中心
* src/router 页面路由。默认所有路由映射写在一个文件，如果需要路由模块化，请自行组织。
* src/views 所有业务逻辑的页面。

## 组件/实例的选项顺序

* name
* components / directives / filters
* extends / mixins
* model / props / propsData
* data / computed
* watch / 生命周期钩子
* methods

```js
<script> 
  export default {
    name: 'ExampleName',  // 这个名字推荐：大写字母开头驼峰法命名。
    props: {},            // Props 定义。
    components: {},       // 组件定义。
    directives: {},       // 指令定义。
    mixins: [],           // 混入 Mixin 定义。
    data () {              // Data 定义。
      return {
        dataProps: ''     // Data 属性的每一个变量都需要在后面写注释说明用途
      }
    },
    computed: {},         // 计算属性定义。
    created () {},         // 生命钩子函数，按照他们调用的顺序。
    mounted () {},         // 挂载到元素。
    activated () {},       // 使用 keep-alive 包裹的组件激活触发的钩子函数。
    deactivated () {},     // 使用 keep-alive 包裹的组件离开时触发的钩子函数。
    watch: {},            // 属性变化监听器。
    methods: {            // 组件方法定义。
      publicbFunction () {}  // 公共方法的定义，可以提供外面使用
      _privateFunction () {} // 私有方法，下划线定义，仅供组件内使用。
    }
  }
</script>
```

## 元素特性的顺序

* is
* v-for / v-if / v-else-if / v-else / v-show / v-cloak
* v-pre / v-once
* id
* ref / key / slot
* v-model
* v-on
* v-html / v-text

## 事件的控制

* 不要使用 this.parent / this.root 进行控制, 会导致流程难以跟踪. 可使用事件中心进行代替。
* 事件中心每添加事件, 需要注明事件的 名称 / 来源文件 / 流向文件, 以及事件的作用。
* 事件移除时需要移除事件中心对应事件注明。
* 组件当中有原生绑定事件, 注意在组建注销前进行移除。

## 指令规范

1、指令有缩写一律采用缩写形式

```js
  // bad
  v-bind:class="{'show-left'：true}"
  v-on:click="getListData"

  // good
  :class="{'show-left'：true}"
  @click="getListData"
```

2、v-for 循环必须加上 key 属性，在整个 for 循环中 key 需要唯一（key不要使用index，不利于diff）

```html
  <!-- good -->
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>

  <!-- bad -->
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
```

3、避免 v-if 和 v-for 同时用在一个元素上（性能问题）

```html
  <!-- bad -->
  <ul>
    <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">
      {{ user.name }}
    </li>
  </ul>

  <!-- good -->
  <ul v-if="shouldShowUsers">
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
```

## Props规范

```js
// bad 这样做只有开发原型系统时可以接受
props: ['status']

// good
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}

```