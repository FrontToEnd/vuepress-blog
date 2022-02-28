(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{834:function(s,t,a){"use strict";a.r(t);var n=a(77),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"剑指offer题解-day17"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#剑指offer题解-day17"}},[s._v("#")]),s._v(" "),a("strong",[s._v("剑指Offer题解 - Day17")])]),s._v(" "),a("h2",{attrs:{id:"剑指-offer-10-ii-青蛙跳台阶问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#剑指-offer-10-ii-青蛙跳台阶问题"}},[s._v("#")]),s._v(" "),a("strong",[s._v("剑指 Offer 10- II. 青蛙跳台阶问题")])]),s._v(" "),a("p",[a("a",{attrs:{href:"https://leetcode-cn.com/leetbook/read/illustration-of-algorithm/57hyl5/",target:"_blank",rel:"noopener noreferrer"}},[s._v("力扣题目链接"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。")]),s._v(" "),a("p",[s._v("答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。")]),s._v(" "),a("p",[a("strong",[s._v("示例 1：")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("输入：n = 2\n输出：2\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("strong",[s._v("示例 2：")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("输入：n = 7\n输出：21\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[a("strong",[s._v("提示：")])]),s._v(" "),a("ul",[a("li",[a("code",[s._v("0 <= n <= 100")])])]),s._v(" "),a("h3",{attrs:{id:"动态规划"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#动态规划"}},[s._v("#")]),s._v(" 动态规划")]),s._v(" "),a("p",[s._v("本题考查动态规划。既然是动态规划，那么就需要先写出动态规划的方程。根据题目描述，青蛙每次可以跳一次台阶或者两次台阶。由此可得出以下结论：")]),s._v(" "),a("ul",[a("li",[s._v("当跳第零层台阶时，只有一种跳法，因此"),a("code",[s._v("f(0) = 1")])]),s._v(" "),a("li",[s._v("当跳第一层台阶时，只有一种跳法，因此"),a("code",[s._v("f(1) = 1")])]),s._v(" "),a("li",[s._v("当跳第二层台阶时，只有两种跳法，因此"),a("code",[s._v("f(2) = 2")])]),s._v(" "),a("li",[s._v("当跳第"),a("code",[s._v("n")]),s._v("层台阶时，要么先跳到f"),a("code",[s._v("(n - 1)")]),s._v("，然后再跳一层台阶到"),a("code",[s._v("n")]),s._v("层；要么先跳到"),a("code",[s._v("f(n - 2)")]),s._v("，然后再跳两层台阶到"),a("code",[s._v("n")]),s._v("层。因此可得："),a("code",[s._v("f(n) = f(n - 1) + f(n - 2)")]),s._v(" 。")])]),s._v(" "),a("p",[s._v("通过以上结论可以发现，其实本题就是类似求斐波那契数列的问题。")]),s._v(" "),a("p",[s._v("参考昨天的题解，我们可以得出以下代码：")]),s._v(" "),a("div",{staticClass:"language-jsx line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-jsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\n * @param {number} n\n * @return {number}\n */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("numWays")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("n")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 初始化和")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 初始化第零层台阶的跳法")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 初始化第一层台阶的跳法")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        sum "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("%")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1000000007")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 大数取模")]),s._v("\n        a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 两数交替前进")]),s._v("\n        b "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" sum"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("ul",[a("li",[a("strong",[s._v("时间复杂度 "),a("em",[s._v("O")]),s._v("(n)")]),s._v("。")]),s._v(" "),a("li",[a("strong",[s._v("空间复杂度 "),a("em",[s._v("O")]),s._v("(1)")]),s._v("。")])]),s._v(" "),a("h3",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),a("p",[s._v("本题是考查动态规划的问题。本题与斐波那契数列问题的唯一不同之处在于初始值不同，其中：")]),s._v(" "),a("ul",[a("li",[s._v("本题的初始值为："),a("code",[s._v("f(0) = 1, f(1) = 1, f(2) = 2")])]),s._v(" "),a("li",[s._v("斐波那契的初始值为："),a("code",[s._v("f(0) = 0, f(1) = 1, f(2) = 1")])])]),s._v(" "),a("p",[s._v("求解此类问题，不可以使用暴力法进行求解，会产生很多无效的分支，时间复杂度是"),a("code",[s._v("O(2^n)")]),s._v(" 。")]),s._v(" "),a("p",[s._v("而使用动态规划求解，可以将时间复杂度降至"),a("code",[s._v("O(n)")]),s._v(" 。")])])}),[],!1,null,null,null);t.default=e.exports}}]);