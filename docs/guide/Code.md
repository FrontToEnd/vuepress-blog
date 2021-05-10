# 通用书写规范

## 文件/资源命名

在 web 项目中，使用连字符（-）来分隔文件名，可以提高可读性。例如：order-detail-view.js。确保不用大写字母开头，不要驼峰命名。

## 省略外链资源 URL 协议部分

省略外链资源（图片及其它媒体资源）URL 中的 http / https 协议，使 URL 成为相对地址，避免[Mixed Content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) 问题。

## 写注释

写注释时请一定要注意：写明代码的作用，重要的地方一定记得写注释。 没必要每份代码都描述的很充分，它会增重HTML和CSS的代码。这取决于该项目的复杂程度。

### 单行注释

JavaScript单行注释：

```js
// 这是一条单行注释
```
CSS单行注释：

```css
/* 这还是一条单行注释 */
```

### 多行注释

```js
/*
* 这是一条多行注释
* 这是一条多行注释
*/
```

### 函数注释

使用[JSDoc](https://jsdoc.app/)风格注释。
```js
/**
* 以星号开头，紧跟一个空格，第一行为函数说明 
* @param {类型} 参数 单独类型的参数
* @param {[类型|类型|类型]} 参数 多种类型的参数
* @param {类型} [可选参数] 参数 可选参数用[]包起来
* @return {类型} 说明
* @author 作者 创建时间 修改时间（短日期）改别人代码要留名
* @example 举例（如果需要）
*/
```

### 文件头注释

推荐：VScode 文件头部自动生成注释插件：**koroFileHeader**,该插件快捷键：window：ctrl+alt+i,mac：ctrl+cmd+i

```js
/*
 * @Author: your name
 * @Date: 2020-05-20 15:38:50
 * @LastEditTime: 2020-05-20 16:47:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \f2e_standard\docs\.vuepress\config.js
 */ 
```

### 条件注释

```html
<!--[if IE 9]>
    .... some HTML here ....
<![endif]-->
```