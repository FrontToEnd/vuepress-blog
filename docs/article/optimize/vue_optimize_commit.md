# 优雅的提交 Git Commit Message

## Commit Message 格式

提交信息主要包括修改类型和内容，修改类型包括：

- feat: 新特性
- fix: 修改问题
- refactor: 代码重构
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- test: 测试用例修改
- chore: 其他修改, 比如构建流程, 依赖管理

当然，人为的记住这么多的类型有点不切实际，而且无法很好的约束提交者，那么就需要引入工具来生成与约束。

## Commitizen: 替代你的 git commit

`commitizen/cz-cli`, 我们需要借助它提供的 `git cz` 命令替代我们的 `git commit` 命令, 帮助我们生成符合规范的 `commit message`。

除此之外, 我们还需要为 `commitizen` 指定一个 `Adapter` 比如: `cz-conventional-changelog` (一个符合 Angular团队规范的 preset). 使得 `commitizen` 按照我们指定的规范帮助我们生成 `commit message`。

### 安装

以项目内安装为例：

```shell
npm install -D commitizen cz-conventional-changelog
```

配置`package.json`:

```json
{
    "scripts": {
        "commit": "git-cz"
    },
    "config": {
        "commitizen": {
          "path": "node_modules/cz-conventional-changelog"
        }
    }
}
```

### 自定义Adapter(可选)

如果觉得默认的类型过多，我们可以自定义提交的类型，这里需要用到`cz-customizable`。

项目内安装：

```shell
npm install cz-customizable -D
```

配置`package.json`:

```json
{
    "config": {
        "commitizen": {
          "path": "node_modules/cz-customizable"
        }
    }
}
```

在根目录下新建`.cz-config.js`，文件内容如下：

```js
module.exports = {
  types: [
    {
      value: 'feat',
      name : 'feat:     A new feature'
    },
    {
      value: 'fix',
      name : 'fix:      A bug fix'
    },
    {
      value: 'docs',
      name : 'docs:     Documentation only changes'
    },
    {
      value: 'refactor',
      name : 'refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      name : 'perf:     A code change that improves performance'
    },
    {
      value: 'test',
      name : 'test:     Add missing tests or correcting existing tests'
    },
    {
      value: 'build',
      name : 'build:    Add missing tests or correcting existing tests'
    },
    {
      value: 'revert',
      name : 'revert:   Revert to a commit'
    }
  ],
  allowBreakingChanges: ['feat', 'fix', 'refactor', 'perf', 'build', 'revert']
};
```

## 校验commit

我们知道，`eslint`用来校验`javascript`的提交是否规范，`stylelint`用来校验`css`的提交是否规范。同样的，我们使用`commitlint`来校验`commit`的提交。

项目内安装：

```shell
npm i -D @commitlint/config-conventional @commitlint/cli
```

配置`package.json`:

```json
"commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
```

或者在根目录下新建`.commitlintrc.js`:

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

### 自定义配置(可选)

如果是使用`cz-customizable`适配器做了破坏 Angular 风格的提交说明配置，那么不能使用`@commitlint/config-conventional`规则进行提交说明校验，可以使用`commitlint-config-cz` 对定制化提交说明进行校验。

项目内安装：

```shell
npm i -D commitlint-config-cz @commitlint/cli
```

同时需要把`.commitlintrc.js`修改为如下配置：

```js
module.exports = {
  extends: [
    'cz'
  ]
};
```

## Husky

由于 git 提供了 hook机制，所以我们可以通过 `git hook` 在 `commit-msg` 阶段进行 `commit message lint`。

项目内安装：

```shell
npm install husky --save-dev
```

配置`package.json`:

```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
}
```

## 使用

按照上述步骤安装完成之后，我们可以通过`npm run commit`或者`git-cz -a`来提交我们的代码到本地仓库。遇到不需要填入的询问直接回车即可。

下图是提交成功后例子：

![success](https://img-node.oss-cn-shanghai.aliyuncs.com/images/20210407142022.png)