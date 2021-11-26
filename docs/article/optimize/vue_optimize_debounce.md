# Vue 项目优化实践-防抖与节流

监听频发的事件，比如用户的输入，窗口调整大小，窗口滚动，点击事件等都等需要预防措施。

这些事件可能会经常发生，例如每秒发生几次，因此在每个事件上调用请求的操作并不是一个明智的选择。

这时我们就需要使用防抖和节流的手段。

## 防抖监听

我们以监听用户输入的组件为例，看下如何防抖：

```vue
<template>
  <input v-model="value" type="text" />
  <p>{{ value }}</p>
</template>
<script>
import debounce from "lodash.debounce";
export default {
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value(...args) {
      this.debouncedWatch(...args);
    },
  },
  created() {
    this.debouncedWatch = debounce((newValue, oldValue) => {
      console.log('New value:', newValue);
    }, 500);
  },
  beforeUnmount() {
    this.debouncedWatch.cancel();
  },
};
</script>
```

上述示例使用了`lodash`中的`debounce`，当然也可以使用其他库的防抖方法。

1. 首先，在`created`生命周期内，防抖回调函数被创建，并赋值给实例`this.debouncedWatch = debounce(..., 500)`。
2. 然后，在监听输入值变动时，调用实例。
3. 最后，在`beforeUnmount`生命周期内，取消实例。

## 防抖事件

接下来看下怎么样防抖事件的触发：

```vue
<template>
  <input v-on:input="debouncedHandler" type="text" />
</template>
<script>
import debounce from "lodash.debounce";
export default {
  created() {
    this.debouncedHandler = debounce(event => {
      console.log('New value:', event.target.value);
    }, 500);
  },
  beforeUnmount() {
    this.debouncedHandler.cancel();
  }
};
</script>
```

跟防抖监听类似，就不具体分析了。

## 注意事项

为什么不按照下面的方式进行防抖？

```vue
<template>
  <input v-on:input="debouncedHandler" type="text" />
</template>
<script>
import debounce from "lodash.debounce";
export default {
  methods: {
    // Don't do this!
    debouncedHandler: debounce(function(event) {
      console.log('New value:', event.target.value);
    }, 500)
  }
};
</script> 
```

如果按照上述写法进行调用，你会发现确实可以生效。但不建议如此。

当一个页面上引入两个或者更多的上述组件实例的时候，所有的组件会使用相同的防抖函数`methods.debouncedHandler`。因此正确做法是将防抖函数绑定到组件实例上。

## 总结

最佳实践就是在`created`的生命周期内，创建防抖或节流的回调，并作为实例属性。

```js
// ...
  created() {
    this.debouncedCallback = debounce((...args) => {
      // The debounced callback
    }, 500);
  },
// ...
```
