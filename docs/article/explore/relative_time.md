# 页面展示相对时间探索

前端表单项目中，经常会展示与时间相关的表格列，比如说修改时间、更新时间等等。此时就会用到将后端返回的时间戳转换为相对时间，也就是诸如一天前等。那么该如何处理呢？

## 使用 Dayjs

此处需要用到第三方库`dayjs` 。熟悉`momentjs`的同学都应该知道，`dayjs`可以完美替代`momentjs`。优点官方有详细说明，可以在官网查看。那么就以一个案例，来具体介绍下如何使用。

```jsx
import dayjs from "dayjs";
import rt from "dayjs/plugin/relativeTime"; // 引入相对时间插件
import "dayjs/locale/zh-cn"; // 引入汉化包
dayjs.extend(rt); // 此处需要继承相对时间插件的方法

function relativeTime(time) {
  if (!isNaN(time)) {
    time = parseInt(time);
  }

  return dayjs().locale("zh-cn").to(dayjs(val)); // 此处为核心使用方法
}
```

从上述例子可以看到，核心在于引入`dayjs`的**相对时间插件**和**汉化包**。

## 总结

本文简单的介绍了如何在页面中展示相对时间，主要是使用了`dayjs` 。总的来说还是非常简单的，小伙伴们赶紧使用起来。
