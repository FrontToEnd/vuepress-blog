# windows环境安装npm版本管理工具nvm

## 卸载已安装的node.js

1. 从卸载程序卸载程序和功能，也可以直接右键node.js的安装包并选择卸载。
2. 从下列的目录中找到相关的内容并删除掉：

    ```bash
    C:\Program Files (x86)\nodejs
    C:\Program Files\nodejs
    C:\Users\{User}\AppData\Roaming\npm
    C:\Users\{User}\AppData\Roaming\npm-cache
    ```

3. 检查环境变量以确保没有引用Nodejs或npm存在。如果有引用，直接删除。
4. 重启电脑。

## 安装nvm

进入[下载地址](https://github.com/coreybutler/nvm-windows/releases)，选择下载 `nvm-setup.zip`，解压文件然后双击安装。这里注意，`nvm`的安装路径名称中最好不要有空格。
安装完成后，打开终端，执行`nvm`，如果出现版本号则安装成功。

## 使用

`nvm`是一个命令行工具，在终端输入`nvm`就可以查看具体的命令。基本命令有：

* `nvm install [version] [arch]`： 该[version]可以是node.js版本或最新稳定版本latest。（可选[arch]）指定安装32位或64位版本（默认为系统arch）。设置[arch]为all以安装32和64位版本。在命令后面添加--insecure ，可以绕过远端下载服务器的SSL验证。
* `nvm list [available]`： 列出已经安装的node.js版本。可选的available，显示可下载版本的部分列表。这个命令可以简写为nvm ls [available]。
* `nvm on`： 启用node.js版本管理。
* `nvm off`： 禁用node.js版本管理(不卸载任何东西)
* `nvm proxy [url]`： 设置用于下载的代理。留[url]空白，以查看当前的代理。设置[url]为none删除代理。
* `nvm node_mirror [url]`：设置node镜像，默认为<https://nodejs.org/dist/>。建议设置为淘宝的镜像<https://npm.taobao.org/mirrors/node/>
* `nvm npm_mirror [url]`：设置npm镜像，默认为<https://github.com/npm/npm/archive/>。建议设置为淘宝的镜像<https://npm.taobao.org/mirrors/npm/>
* `nvm uninstall [version]`： 卸载指定版本的nodejs。
* `nvm use [version] [arch]`： 切换到使用指定的nodejs版本。可以指定32/64位[arch]。
* `nvm root [path]`： 设置 nvm 存储node.js不同版本的目录 ,如果[path]未设置，将使用当前目录。
* `nvm version`： 显示当前运行的nvm版本，可以简写为`nvm v`

### 安装指定版本node

在安装之前，

1. 执行`nvm list available` ，查看可以安装的node版本，详细的版本可[点击链接](https://nodejs.org/download/release/)查看。
2. 执行`nvm node_mirror https://npm.taobao.org/mirrors/node/`，将node源设置为淘宝的镜像。
3. 执行`nvm npm_mirror https://npm.taobao.org/mirrors/npm/`，将npm源设置为淘宝的镜像。

设置完镜像后，就可以进行node安装了。由于云析项目对`node-sass`版本有要求， 这里以安装10.19.0为例。

使用`nvm install`安装指定版本的node。

```bash
nvm install 10.19.0
```

使用`nvm use`来使用已安装的指定版本的node。

```bash
nvm use 10.19.0
```

使用`nvm list`可以查看已经安装的node版本。

```bash
C:\Users\dell>nvm list

* 10.19.0 (Currently using 64-bit executable)

C:\Users\dell>node -v

v10.19.0

C:\Users\dell>npm -v

6.13.4
```

### 卸载指定版本node

如果需要卸载某个版本的node，执行`nvm uninstall [version]`。
