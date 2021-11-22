# Vue项目中如何做单元测试

上篇文章总结了前端项目如何引入单元测试。接下来详细记录下如何具体做单元测试？通过本文，你可以学到：

1. 断言库的方法有哪些？
2. 怎么对vue组件写单元测试？

## 测试框架和断言库

本文默认采用`jest`。`jest`内置了集成度比较高的断言库`expect.js`。相较于其他测试框架，最大的特点就是内置了常用的测试工具，比如**自带断言、测试覆盖率**工具，实现了开箱即用，这也和它官方的slogan相符。

## 断言库方法

### 匹配器

最常测试的就是对返回值进行匹配测试。`toBe`就是用来测试两个数值是否相等。`toBe`函数内部使用了`Object.is`来进行精确匹配，它的特性类似于`===`。

```js
it('test toBe', () => {
    expect(true).toBe(true)
})
```

对于对象等数据，我们需要使用`toEqual`：

```js
it('test toEqual', () => {
    expect([1,2]).toEqual([1,2])
})
```

其他匹配器含义如下：

- **toBeNull**：只匹配`null`
- **toBeUndefined**：只匹配`undefined`
- **toBeDefined**：与`toBeUndefined`相反，等价于`.not.toBeUndefined`
- **toBeTruthy**：匹配任何`if`语句为真
- **toBeFalsy**：匹配任何`if`语句为假
- **toBeGreaterThan**：大于
- **toBeGreaterThanOrEqual**：大于等于
- **toBeLessThan**：小于
- **toBeLessThanOrEqual**：小于等于
- **toBeCloseTo**：特殊的浮点数据计算，比如`0.1 + 0.2`
- **toContain**：判断可迭代数据是否有某一项

### 异步代码

如何测试异步代码？比如`setTimeout`，接口请求都是异步执行。`Jest`支持在测试用例中直接返回`promise`，那么我们可以：

```js
// 异步代码
fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise data");
    }, 2000);
  });
}

it("promise callback", () => {
  return fetchData().then((res) => {
    expect(res).toBe("promise data");
  });
});
```

除了返回`promise`，也可以通过`.resolves/.rejects`匹配符进行匹配：

```js
it("promise callback", () => {
  return expect(fetchData()).resolves.toBe("promise data");
});
```

同时，还支持使用`async/await`语法糖，需要注意的是，我们要在测试用例的回调函数加上`async`：

```js
it("async/await callback", async () => {
  const data = await fetchData();
  expect(data).toBe("promise data");
});
```

### 全局挂载和卸载

我们需要在每个测试用例前初始化一些数据，或者在每个测试用例之后清除数据，就可以使用`beforeEach`和`afterEach`，这两种方法会**默认使用到每一个测试用例**，如果只需要在个别测试用例中使用，可以这么处理：

```js
beforeEach(() => {
  // 应用到所有的test
});
afterEach(() => {
  // 应用到所有的test
});
describe("put test together", () => {
  beforeEach(() => {
    // 只应用当前describe块中的test
  });
  afterEach(() => {
    // 只应用当前describe块中的test
  });
  it("test1", ()=> {})
});
```

相对应的就是`beforeAll`和`afterAll`，区别就是`beforeAll`和`afterAll`**只会执行一次**。

## 编写vue组件测试用例

### 挂载组件

我们要对vue组件进行单元测试，首先就需要挂载组件，同时拿到组件的实例。我们使用`mount`来进行挂载组件，组件进行挂载后得到一个`wrapper`（包裹器），`wrapper`会暴露很多封装、遍历和查询其内部的`Vue`组件实例的便捷的方法。

需要注意的是，`mount`会挂载当前组件的子组件。但有时候我们只想测试组件本身，并不关心子组件或者不想让子组件进行渲染，应该怎么做呢？

这时候应该使用`shallowMount`挂载函数。顾名思义，`shallowMount`不会渲染子组件。

```js
import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter";
const wrapper = mount(Counter);
const vm = wrapper.vm;
```

其中，`wrapper.vm`用来获取组件的`Vue`实例。进而用来访问`data、methods`等。`wrapper`上有很多方法，举例如下：

```js
describe("Counter", () => {
  const wrapper = mount(Counter);
  it("counter class", () => {
    expect(wrapper.classes()).toContain("counter");
    expect(wrapper.classes("counter")).toBe(true);
  });
  it("counter has span", () => {
    expect(wrapper.html()).toContain("<span class="count">0</span>");
  });
  it("counter has btn", () => {
    expect(wrapper.find("button#add").exists()).toBe(true);
    expect(wrapper.find("button#add").exists()).not.toBe(false);
  });
});
```

上述例子使用了4个不同的方法，具体含义为：

- **classes**：获取`wrapper`的`class`，并返回一个数组
- **html**：获取组件渲染`html`结构字符串
- **find**：返回第一个匹配子元素的`wrapper`
- **findAll**：返回所有匹配子元素的`wrapper`
- **exists**：断言`wrapper`是否存在

大部分情况下，组件需要接受外部传入的props等，那么应该怎么模拟这些外部属性呢？

```js
const wrapper = mount(Component, {
  // 向组件传入data，合并到现有的data中
  data() {
    return {
      foo: "bar"
    }
  },
  // 设置组件的props
  propsData: {
    msg: "hello"
  },
  // vue本地拷贝
  localVue,
  // 伪造全局对象
  mocks: {
    $route
  },
  // 插槽
  // 键名就是相应的 slot 名
  // 键值可以是一个组件、一个组件数组、一个字符串模板或文本。
  slots: {
    default: SlotComponent,
    foo: "<div />",
    bar: "<my-component />",
    baz: ""
  },
  // 用来注册自定义组件
  stubs: {
    "my-component": MyComponent,
    "el-button": true,
  },
  // 设置组件实例的$attrs 对象。
  attrs: {},
  // 设置组件实例的$listeners对象。
  listeners: {
    click: jest.fn()
  },
  // 为组件传递用于注入的属性
  provide: {
    foo() {
      return "fooValue"
    }
  }
})
```

这里重点解释下`stubs`的用途。

`stubs`主要用来**处理在全局注册的自定义组件**，比如我们常用的组件库`Element`等，直接使用`el-button`、`el-input`组件，或者`vue-router`注册在全局的`router-view`组件等；当我们在单元测试中引入时就会提示我们对应的组件找不到，这时我们就可以通过这个`stubs`来避免报错。

### 操作组件

说明：以下例子没有特殊情况默认进行了挂载操作。即：

```js
import { mount } from "@vue/test-utils";
import Form from "@/components/Form";
const wrapper = mount(Form);
const vm = wrapper.vm;
```

先贴出一个简单的`Form`表单组件：

```vue
<template>
  <div class="form">
    <div class="title">{{ title }}</div>
    <div>
      <span>请填写姓名：</span>
      <input type="text" id="name-input" v-model="name" />
      <div class="name">{{ name }}</div>
    </div>
    <div>
      <span>请选择性别：</span>
      <input type="radio" name="sex" v-model="sex" value="f" id="" />
      <input type="radio" name="sex" v-model="sex" value="m" id="" />
    </div>
    <div>
      <span>请选择爱好：</span>
      footbal
      <input
        type="checkbox"
        name="hobby"
        v-model="hobby"
        value="footbal"
      />
      basketball
      <input
        type="checkbox"
        name="hobby"
        v-model="hobby"
        value="basketball"
      />
      ski
      <input type="checkbox" name="hobby" v-model="hobby" value="ski" />
    </div>
    <div>
      <input
        :class="submit ? 'submit' : ''"
        type="submit"
        value="提交"
        @click="clickSubmit"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Form",
  props: {
    title: {
      type: String,
      default: "表单名称",
    },
  },
  data() {
    return {
      name: "",
      sex: "f",
      hobby: [],
      submit: false,
    };
  },
  methods: {
    clickSubmit() {
      this.submit = !this.submit;
    },
  },
};
</script>
```

首先，先来看下怎么修改`props`传入的`title`。

先上结论：我们可以通过`setProps`对`props`值进行修改。

但是需要注意的是，我们改变`prop`和`data`后，获取`DOM`发现数据并不会立即更新；在页面上我们一般都会通过`$nextTick`进行解决，在单元测试时，我们也可以使用`nextTick`配合获取`DOM`。

```js
const wrapper = mount(Form, {
  propsData: {
    title: "form title",
  },
});
const vm = wrapper.vm;

it("change props", async () => {
  expect(wrapper.find(".title").text()).toBe("form title");
  wrapper.setProps({
    title: "new form title",
  });
  await wrapper.vm.nextTick();
  // 或者使用Vue的nextTick
  // await Vue.nextTick();
  expect(wrapper.find(".title").text()).toBe("new form title"); // 如果不使用nextTick，这里会报错
});
```

同样的，我们可以通过`setData`对`data`值进行修改。

```js
it("test set data", async () => {
  wrapper.setData({
    name: "new name",
  });
  expect(vm.name).toBe("new name");
  await wrapper.vm.nextTick();
  expect(wrapper.find(".name").text()).toBe("new name"); // 如果不使用nextTick，这里会报错
});
```

那么如何改变`input`这种输入性的组件元素的值呢？有两种方式，举例如下：

```js
it("test input set value", async () => {
  const input = wrapper.find("#name-input");
  await input.setValue("change input by setValue");
  expect(vm.name).toBe("change input by setValue");
  expect(input.element.value).toBe("change input by setValue");
});

// 等价于
it("test input trigger", () => {
  const input = wrapper.find("#name-input");
  input.element.value = "change input by trigger";

  // 通过input.element.value改变值后必须触发trigger才能真正修改
  input.trigger("input");
  expect(vm.name).toBe("change input by trigger");
});
```

可以看出，改变`input`的值后，由于`v-model`绑定关系，因此`vm`中的`data`数据也进行了改变。注意第二种方式的触发方式。

对于`radio、checkbox`选择性的组件元素，我们可以通过`setChecked(Boolean)`函数来触发值的更改，更改同时也会更新元素上`v-model`绑定的值：

```js

it("test radio", () => {
  expect(vm.sex).toBe("f");
  const radioList = wrapper.findAll('input[name="sex"]');
  radioList.at(1).setChecked();
  expect(vm.sex).toBe("m");
});
it("test checkbox", () => {
  expect(vm.hobby).toEqual([]);
  const checkboxList = wrapper.findAll('input[name="hobby"]');
  checkboxList.at(0).setChecked();
  expect(vm.hobby).toEqual(["footbal"]);
  checkboxList.at(1).setChecked();
  expect(vm.hobby).toEqual(["footbal", "basketball"]);
  checkboxList.at(0).setChecked(false);
  expect(vm.hobby).toEqual(["basketball"]);
});
```

对于按钮，可以使用`trigger`进行触发：

```js
it("test click", async () => {
  const submitBtn = wrapper.find('input[type="submit"]');
  await submitBtn.trigger("click");
  expect(vm.submit).toBe(true);
  await submitBtn.trigger("click");
  expect(vm.submit).toBe(false);
});
```

### 自定义事件

可以通过`wrapper.vm.$emit`来触发自定义事件。所有`$emit`触发返回的数据都存储在`wrapper.emitted()`。`wrapper.emitted()`返回的对象格式如下：

```js
{
    foo: [ [ 'foo1', 'foo2' ], [ 'foo3' ] ],
    bar: [ [ 'bar1' ] ]
}
```

其中，数组的长度代表该事件被触发了多少次。我们可以通过这个特性，来判断事件是否被触发过。

具体思路就是通过`trigger`来触发按钮点击事件，点击事件里会进行`this.$emit`；或者通过`wrapper.vm.$emit`进行触发。

```js
it("test emit", async () => {

  // 组件元素触发emit
  await wrapper.find('input[type="submit"]').trigger("click");
  wrapper.vm.$emit("foo", "foo3");
  await vm.$nextTick();
  const emitted = wrapper.emitted();

  // foo被触发过
  expect(emitted.foo).toBeTruthy();

  // foo触发过两次
  expect(emitted.foo.length).toBe(2);

  // 断言foo第一次触发的数据
  expect(emitted.foo[0]).toEqual(["foo1", "foo2"]);

  // baz没有触发
  expect(emitted.baz).toBeFalsy();
});
```

上述例子是获取所有的emit。我们也可以通过传入参数，获取指定的自定义事件。

```js
expect(wrapper.emitted('foo')).toBeTruthy();
expect(wrapper.emitted('foo').length).toBe(2);
```

如果事件通过子组件进行触发，我们也可以通过子组件进行`emit`：

```js
import { mount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent'
import ChildComponent from '@/components/ChildComponent'

describe('ParentComponent', () => {
  it("child emit", () => {
    const wrapper = mount(ParentComponent)
    wrapper.find(ChildComponent).vm.$emit('custom') // 子组件$emit
  })
})
```

### 配合vue-router

如果组件中用到了`vue-router`，那么直接执行测试用例会报错，那么就需要引入来防止报错。直接使用`Vue.use(VueRouter)`是不推荐的，因为会污染全局的`Vue`。

这里有两种解决方案：

我们先来看第一种。第一种使用`createLocalVue`创建一个`Vue`的类，我们可以在这个类中进行添加组件、混入和安装插件而不会污染全局的`Vue`类：

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Header from "@/components/Header";

// 一个Vue类
const localVue = createLocalVue()
localVue.use(VueRouter)
// 路由数组
const routes = []
const router = new VueRouter({
  routes
})

shallowMount(Header, {
  localVue,
  router
})
```

首先通过`createLocalVue()`来创建一个不会污染全局的`vue`实例。然后调用`localVue.use(VueRouter)`来使用路由，相当于`Vue.use(VueRouter)`。最后实例化`router`对象并进行挂载。可以看到整体流程跟全局挂载路由是非常相似的。

再来看第二种方式。第二种方式是注入伪造数据，这里主要用的就是`mocks`和`stubs`，`mocks`用来**伪造**`route`和`router`等全局对象，是一种将属性添加到`Vue.prototype`上的方式；而`stubs`用来**覆写全局或局部注册的组件**：

```js
import { mount } from "@vue/test-utils";
import Header from "@/components/Header";

describe("header", () => {
  const $route = {
    path: "/home",
    params: {
      id: "111",
    },
  };
  const $router = {
    push: jest.fn(),
  };
  const wrapper = mount(Header, {
    stubs: ["router-view", "router-link"],
    mocks: {
      $route,
      $router,
    },
  });
  const vm = wrapper.vm;
  it("render home div", () => {
    expect(wrapper.find("div").text()).toBe("111");
  });
});
```

可以看到，第二种方式可扩展性更强，可以**伪造路由的数据**。

### 配合Vuex

跟`Vue-Router`类似，我们需要伪造`store`数据来达到目的。接下来看看如何进行`store`数据伪造。

```js
import { mount, createLocalVue } from "@vue/test-utils";
import Count from "@/components/Count";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("count", () => {
  const state = {
    number: 0,
  };
  const mutations = {
    ADD_COUNT: jest.fn(),
    SUB_COUNT: jest.fn(),
  };
  const store = new Vuex.Store({
    state,
    mutations
  });
  it("render", async () => {
    const wrapper = mount(Count, {
      store,
      localVue,
    });
    expect(wrapper.find(".number").text()).toBe("0");
    wrapper.find(".add").trigger("click");
    expect(mutations.ADD_COUNT).toHaveBeenCalled();
    expect(mutations.SUB_COUNT).not.toHaveBeenCalled();
  });
});
```

由代码可以看出，`store`数据的伪造与`router`的第一种方式十分类似。也是通过`vue`实例引用并挂载来实现。这里我们并不关心`mutations`中函数做了哪些操作，我们只要知道元素点击触发了哪个`mutations`函数，通过伪造的函数我们去断言`mutations`**是否被调用**。

## 举个栗子

下面是一个用来包裹的函数式组件：

```vue
<template functional>
  <component
    :is="props.tag"
    :ref="data.ref"
    class="container mx-auto"
    :class="[
      data.class,
      data.staticClass,
    ]"
    :style="[
      data.style,
      data.staticStyle,
    ]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Container',

  props: {
    tag: {
      default: 'div',
      type: String,
    },
  },
};
</script>

```

我们看看如何写一个比较合理的单元测试，此处参考了[mijin](https://lecoueyl.github.io/mijin.web/docs/general/getting-started)源码中的单元测试。

```js
import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import Container from './Container.vue';

describe('Container', () => {
  enableAutoDestroy(afterEach);

  it('has default structure', async () => {
    const wrapper = shallowMount(Container);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes('container')).toBe(true);
  });

  it('renders default slot content', async () => {
    const wrapper = shallowMount(Container, {
      slots: {
        default: '<span>foobar</span>',
      },
    });

    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.text()).toBe('foobar');
  });

  it('renders custom root element', async () => {
    const wrapper = shallowMount(Container, {
      propsData: {
        tag: 'section',
      },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
  });

  it('should emit events', async () => {
    let called = 0;
    let event = null;
    const wrapper = shallowMount(Container, {
      listeners: {
        blur: (e) => {
          event = e;
          called += 1;
        },
        click: (e) => {
          event = e;
          called += 1;
        },
        focus: (e) => {
          event = e;
          called += 1;
        },
      },
    });

    expect(called).toBe(0);
    expect(event).toEqual(null);

    await wrapper.trigger('click');
    expect(called).toBe(1);
    expect(event).toBeInstanceOf(MouseEvent);

    await wrapper.element.dispatchEvent(new Event('focus'));
    expect(called).toBe(2);
    expect(event).toBeInstanceOf(Event);

    await wrapper.element.dispatchEvent(new Event('blur'));
    expect(called).toBe(3);
    expect(event).toBeInstanceOf(Event);
  });
});
```

可以看到，该单元测试着重测试了组件挂载后的默认标签、指定默认插槽后渲染的内容、指定标签后的渲染情况，最后还测试了**派发相关事件**后，是否触发。

## 总结

本文详细介绍了`jest`断言库的一些基本语法，方便大家快速的掌握常用的方法并加以使用。然后介绍了如何对vue组件进行单元测试，包括`props、data、vue-router、vuex`的设置与伪造。不过不是所有的组件都需要进行单元测试，毕竟单元测试也是需要人力成本的。如果组件满足以下条件，可以考虑引入单元测试：

- 长期稳定的项目迭代，需要保证代码的可维护性和功能稳定；
- 页面功能相对来说比较复杂，逻辑较多；
- 对于一些复用性很高的组件，可以考虑单元测试；
