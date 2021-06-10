# 从0搭建脚手架

本篇文章的诞生借鉴了[《从 0 构建自己的脚手架知识体系》](https://juejin.cn/post/6966119324478079007)，详细的教程可以点开链接进行学习，这里重点记录实操过程中遇到的问题。

提到脚手架，首先想到的就是诸如`vue-cli`和`create-react-app`等官方提供的脚手架。脚手架的作用就是提高开发的效率，通过交互式命令的方式快速的创建模板项目，防止我们成为CV工程师。

>总得来说，脚手架的基本工作流程包括：
>
> 1. 通过命令行交互询问用户问题
> 2. 根据用户回答的结果生成文件

通过研究发现，`vue-cli`是根据一些列的询问动态生成模板文件以及`package.json`，这种方式更加的灵活，但是开发成本也很大，需要考虑到各种问题。这里采取另一种思路：远程拉取模板文件。核心思路是：通过交互式的询问选择需要的模板，根据tag来区分模板的版本；选择版本后将远程模板下载到当前目录。

## 脚手架工具库

开发之前先介绍下用到的工具库，具体的用法可以点击链接查看文档说明：

- [commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md) - 命令行自定义指令
- [inquirer](https://github.com/SBoudrias/Inquirer.js/) - 命令行询问用户问题，记录回答结果
- [chalk](https://github.com/chalk/chalk) - 控制台输出内容样式美化
- [ora](https://github.com/sindresorhus/ora) - 控制台 loading 样式
- [figlet](https://github.com/patorjk/figlet.js) - 控制台打印 logo
- [easy-table](https://github.com/eldargab/easy-table) - 控制台输出表格
- [download-git-repo](https://gitlab.com/flippidippi/download-git-repo) - 下载远程模版
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - 系统fs模块的扩展
- [cross-spawn](https://github.com/moxystudio/node-cross-spawn) - 支持跨平台调用系统上的命令

## 开发脚手架

我们的开发步骤包括：

1. 创建项目
2. 创建脚手架启动命令（使用 commander）
3. 询问用户问题获取创建所需信息（使用 inquirer）
4. 下载远程模板（使用 download-git-repo）
5. 发布项目

具体的开发步骤可以点击开篇提到的文章进行学习，下面记录下遇到的问题。

使用`npm link`可以将在全局文件 `{prefix}/lib/node_modules/<package>` 内，创建一个符号链接`（symlink）`，这个链接指向 `npm link` 命令执行的地方。该命令方便我们在开发的过程中进行调试。英文文档的原文如下：

> Next, in some other location, npm link package-name will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.
> Note that package-name is taken from package.json, not from the directory name.

具体到我们开发的脚手架，软链接取自`package.json`里的`bin`字段下面的关键字，将其放在全局文件中。需要注意的是，本地开发调试完毕后，需要执行`npm unlink`取消软链接，否则最终安装脚手架的包会报错，提醒全局文件中已存在对应的文件，需要手动删除。

我的电脑windows10下的全局命令是存放在`C:\Program Files\nodejs`目录下。也就是说，最终安装的目录是`C:\Program Files\nodejs\node_modules\zqy-cli`。而全局命令之所以可以执行也是因为在`C:\Program Files\nodejs`下生成了三个文件，对应不同的操作系统。使用全局命令创建模板时，node会根据操作系统找对应的文件，里面会告诉`node`最终执行的入口文件，比如说`$basedir/node_modules/zqy-cli/bin/cli.js`。而`cli.js`正是我们的入口文件。

开发完毕后，我们需要发布到`npm`上。发布`npm`包的命令是`npm publish`。发布之前需要确保本地已经登录。本地登录`npm`使用的命名是`npm login`。需要输入用户名、密码和邮件。如果没有npm的账号建议去官网进行注册。也可以通过命令`npm adduser`来创建，同样需要输入用户名、密码和邮件。这里需要注意的是，一定要将`npm`的源设置为官方源，否则登录会失败。切换源的命令为：`npm config set registry https://registry.npmjs.org/`。

发布成功后，我们的脚手架就正式完成了。

## 使用脚手架

如果需要使用，我们可以全局安装：`npm install -g zqy-cli`。安装完成后，可以使用全局命令`zqy`去创建模板项目：`zqy create my-demo`。目前一共有`vue2.0`和`vue3.0`两个版本的模板，后续如果有更多的定制化需求，也会上线各个模板版本，保证团队高效的开发。
