# Vue3.0学习笔记

## setup函数

Vue 2.0 中我们通过 props、data、methods 等来定义组件， 在 Vue3.0 中使用 **setup**定义响应式的数据和方法。

```html
<template>
    <h3>欢迎</h3>
    <button v-for="(item, key) in data.languages" :key="key" @click="selectLangFun(key)">{{item}}</button>
    <p>你选择的课程是【{{selected}}】</p>
</template>

<script lang="ts">
import { reactive, ref} from "vue";
export default {
    name: "ProgramSelect",
    setup() {
        const data = reactive({
            languages: ["Java", "Javascript", "C#"]
        });
        const selected = ref("");
        const selectLangFun = (params: number): void => {
            selected.value = data.languages[params];
        }
        return {
            data,
            selected,
            selectLangFun
        }
    }
}
```

- setup(props, context)函数其实有 2 个参数，props 对应 Vue 2 中 props， 里面定义的父组件传递给子组件的变量；setup 函数中没有暴露 this，context 对应于 Vue 2 中 this 对象。
- 所有在 template 模板中使用的变量、数据、方法都需要通过 setup 函数 return 出去。
- 通过 reactive 和 ref 来创建响应式的变量。两者的区别是 reactive 创建的是对象变量的响应式，而 ref 用来创建基本类型的响应式。
- ref 创建的变量 selected 修改值的时候要加上 value。Vue3 内部会将简单类型如字符串"hello"，动态转为一个对象，具有 value 属性，值是"hello"。

## toRef和toRefs

- toRef() 是一个函数，返回一个 ToRef 对象。使用语法是 `const result = toRef(target, "key")` 。
- toRef() 的设计初衷应该是想和 Ref() 函数类似，Ref() 是将一个基础类型的变量进行响应式化（返回一个具有 value 属性的对象），而 toRef() 则是从对象中剥离出属性来（返回一个具有 value 属性的对象），如果原始对象是响应式的，那么剥离出的属性也是响应式的；如果原始数据不是响应式，那么剥离出来的属性就是普通对象了，不具响应式的作用。
- toRefs() 函数与 toRef() 很相似。**toRef() 剥离的是对象的某个属性，toRefs() 剥离的是对象的所有属性**，返回一个新对象。
- toRefs() 函数用法是 `const result = toRefs(target)`; target 的每个属性都会被转换为 ToRef 对象。
同 toRef() 一样，如果原始数据 target 具有响应式的，那么 result 也是响应式；如果 target 是普通对象，那么 result 也是普通对象，不具有响应式。
- 由于 toRefs() 函数返回的是一个对象，对象每个属性都是 ToRef 对象。我们知道 `...` 解构对象是浅拷贝，所以使用 toRefs() 函数，我们可以对响应式的数据进行解构。

```html
<template>
    <p>我是 {{name}}，年龄{{age}} <button @click="change">change</button></p>
</template>
<script>
import {reactive, toRefs} from 'vue';
export default {
    setup(){
        const data = reactive({
            name: "chuck",
            age: 26,
            change: ()=>{
                data.age++;
            }
        })
        return {
            ...toRefs(data)
        }
    }
}
</script>
```

## watch

- `watch(arg, (newVal, oldVal)=>{})` 可以只监听一个响应式的变量 arg，第二个参数是回调函数，当 arg 改变的时候，副作用的函数逻辑。newVal 表示变量修改后的值，oldVal 表示变量的旧值。
- `watch([arg1, arg2,...], (newVal, oldVal)=>{})` 也可以监听多个响应式的变量 arg1、arg2 等，第二个参数是回调函数，当 arg1、arg2...任意一个改变的时候，副作用的函数逻辑。newVal 表示变量修改后的值，这个时候以数组的形式显示，与变量 arg1、arg2...一一对应；oldVal 表示变量的旧值，以数组的形式显示，与变量 arg1、arg2...一一对应
- `selected` 是 `ref` 函数创建的变量，我们可以直接监听。
- `data` 是 `reactive` 函数创建的变量，我们只想监听某个属性（count），需要写成函数获取的形式。

## 生命周期

![hook](https://img-node.oss-cn-shanghai.aliyuncs.com/images/20210106103310.png)

- 我们之前需要在 vue2.0 中 beforeCreate and created 定义逻辑可以直接定义在 setup 中。
- onX 要先 import 后再 setup 函数中定义。
- Options API 与 setup() 函数是同级的，并且不需要导入。

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  },
  created(){
    console.log("created")
  },
  beforeCreate(){
      console.log("beforeCreate")
  },
  beforeMount(){
      console.log("beforeMount")
  },
  mounted(){
      console.log("mounted")
  }
  ```

- Vue2.0 和 Vue3.0 的加载顺序是：setup() -> beforeCreate -> created -> onBeforeMount -> beforeMount -> renderTracked -> onMounted -> mounted
- Vue2.0 和 Vue3.0 的更新顺序是：renderTriggered -> onBeforeUpdate -> beforeUpdate -> renderTracked -> onUpdated -> updated
- Vue2.0 和 Vue3.0 的组件卸载顺序是：onBeforeUnmount -> beforeUnmount -> onUnmounted -> unmounted

## Composition API

用于公共逻辑的提取，提高可复用性。

```js
//新建文件夹 hooks，并新建文件 useMousePosition.ts
import { reactive, onMounted, onUnmounted } from 'vue';
function useMousePosition(){
    const pointer = reactive({
        x: 0,
        y: 0
      });
      const updateMouse = (e: MouseEvent)=>{
        pointer.x = e.pageX;
        pointer.y = e.pageY;
      };
      onMounted(()=>{
        document.addEventListener("click", updateMouse)
      });
      onUnmounted(()=>{
        document.removeEventListener("click", updateMouse)
      });
      return pointer;
}
export default useMousePosition;
```

然后在需要使用的地方进行引用。

```html
<template>
  <p>X: {{x}}, Y: {{y}}</p>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs} from 'vue';
//导入 useMousePosition
import useMousePosition from './hooks/useMousePosition';
export default defineComponent({
  name: 'App',
  setup(){
    const pointer = useMousePosition();
    return{
      ...toRefs(pointer)
    }
  }
});
</script>
```

不得不说，跟React Hooks非常相似。

## Teleport组件

**Teleport**组件设计的目的是将某个组件挂载在指定的元素上。Vue3.0 的Teleport组件可以让我们将某个组件挂载在指定节点上，比如跟根节点app同级的节点上，让代码的实现更符合我们的习惯，而不是层层嵌套在app节点上。这个设计思路跟**React.PureComponent**很相似。

- 新建 Modal.vue 文件，Vue3.0的组件将 **emits**抽出来，使逻辑更加清晰；并能通过 **payload.type**校验传递进来的数据。
- teleport中的 **to** 指定将要挂载的元素，这里是id为modal的元素。

```html
// Modal.vue 文件
<template>
    <teleport to="#modal">
        <div id="center" v-if="isOpen">
            <h1><slot>标题</slot></h1>
            <button @click="close">close</button>
        </div>
    </teleport>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    props: {
        isOpen: Boolean
    },
    emits: {
        'close-modal': (payload: any)=>{
            return payload.type === "close"
        }
    },
    setup(props, context){
        const close = function(){
            context.emit("close-modal", {type: "close"});
        }
        return {
            close
        }
    }
})
</script>
<style scoped>
    #center{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 200px;
        height: 200px;
        border: 1px solid #cccccc;
        background: white;
        margin: auto;
    }
</style>
```

在任意组件中使用。

```html
<template>
    <p>是我<button @click="showModal">显示弹出框</button></p>
    <Modal :isOpen="openFlag" @closeModal="close">
        <slot>this is title</slot>
    </Modal>
</template>
<script lang="ts">
import {ref} from 'vue'
import Modal from "./Modal.vue";
export default {
    components: {
        Modal
    },
    setup(){
        const openFlag = ref(true);
        const close = function(){
            openFlag.value = false;
        }
        const showModal = function(){
            openFlag.value = true;
        }
        return{
            openFlag,
            close,
            showModal
        }
    }
}
</script>
```
