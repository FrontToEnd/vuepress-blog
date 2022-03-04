# 部署CentOS前端环境

## 前言

起先博客是使用`vercel`自动化部署的，但是最近微信把`vercel.app`的域名给拦截了，因此选择自行购买域名服务器进行博客部署。

## 购买服务器

服务器购买选择的腾讯云服务器，配置是：2核CPU、4G内存、8M带宽、80GB SSD云硬盘、1200GB/月。费用是153/3年。

镜像选择的是`CentOS8.0` ，后续可以一键重装系统。

## 购买域名

域名购买是在阿里云选择购买的，可以选择免费证书，让网站用上`HTTPS`。

域名购买成功后，需要进行备案，如果不需要备案请忽略。备案可以在云服务提供商处按步骤进行。该步骤需要半个月左右，申请提交成功后，会有客服进行确认，协助你进行信息的填写。如果一切顺利，最终会收到备案成功的短信，最后将备案信息写入网站的页脚。

接着进行域名解析的配置。我们在域名解析的控制台添加记录。添加记录类型为`A`，主机记录分别是`@`和`www`的两条记录，记录值填写购买的服务器所属的公网IP地址。至此，域名和服务器直接就成功关联起来。

## 配置

首先在[控制台](https://console.cloud.tencent.com/lighthouse/instance/index)修改实例的密码，方便后续使用`SSH`进行登录。

然后通过`SSH`访问服务器后，进行一系列的依赖安装。

## 安装依赖

下面就来介绍需要安装的依赖。

### yum源

官方对yum的介绍是：

> Yellow dog Updater, Modified (Yum) is the default package manager used in CentOS ( all versions ). It is used to install and update packages from CentOS.
>

首先记录下常用的一些`yum`的命令。

```bash
// 1 安装 
yum install package  // 安装指定的安装包package 

// 2 更新和升级 
yum update  // 全部更新 
yum update package  // 更新指定程序包package
yum check-update  // 检查可更新的程序 
yum upgrade package  // 升级指定程序包package 

// 3 查找和显示 
yum info // 列出所有可以安装或更新的包的信息
yum info package //显示安装包信息package 
yum list // 显示所有已经安装和可以安装的程序包 
yum list package  // 显示指定程序包安装情况package
yum search package // 搜索匹配特定字符的package的详细信息

// 4 删除程序 
yum remove | erase package  // 删除程序包package
yum deplist package  // 查看程序package依赖情况

// 5 清除缓存 
yum clean packages  // 清除缓存目录下的软件包 
yum clean headers // 清除缓存目录下的 headers 
yum clean oldheaders // 清除缓存目录下旧的 headers 
yum clean, yum clean all  // (= yum clean packages; yum clean oldheaders) 清除缓存目录下的软件包及旧的headers
```

这里我们运行`yum update` 来更新下所有的包。

### git

安装`git`比较简单，方便我们克隆代码以及版本管理。

```bash
yum install git
```

### nvm

`nvm`是管理`node`版本的工具，可以很方便的切换不同版本的`node` 。

1. 通过`git`安装`nvm`

    ```bash
    git clone git://github.com/creationix/nvm.git ~/nvm
    ```

2. 加入系统环境

    ```bash
    echo "source ~/nvm/nvm.sh" >> ~/.bashrc
    source  ~/.bashrc
    ```

3. 查看可以安装的版本

    ```bash
    nvm list-remote
    ```

4. 安装指定版本的`node`

    ```bash
    nvm install v16.0.0
    ```

5. 查看当前机器已安装版本号

    ```bash
    nvm list
    ```

6. 切换`node`版本

    ```bash
    nvm use v16.0.0
    ```

至此，我们就成功使用了特定版本的`node`。

### Nginx

`Nginx` 是一个高性能的 `HTTP`服务器，`Nginx`几乎已经是互联网系统中不可或缺的一部分。接下来进行安装。

```bash
sudo yum -y install nginx
```

执行完上述命令后，`Nginx`就安装成功了。

接下来记录常用的`Nginx`命令：

```bash
sudo yum -y install nginx   # 安装 nginx
sudo yum remove nginx  # 卸载 nginx
sudo systemctl enable nginx # 设置开机启动 
sudo service nginx start # 启动 nginx 服务
sudo service nginx stop # 停止 nginx 服务
sudo service nginx restart # 重启 nginx 服务
sudo service nginx reload # 重新加载配置，一般是在修改过 nginx 配置文件时使用。
ps -ef | grep nginx # 查看服务进程
```

接下来进行`nginx`的配置。

先来介绍下配置的具体含义：

- `server`：`server` 块用来配置 “虚拟服务器” ，每一个 `server` 块都相当于一台 “虚拟服务器”，“虚拟服务器” 是一个与实体服务器相对应的概念，将一台实体服务器进行划分，对外表现为多个服务器，可以充分利用服务器的硬件资源，并且可以不用为每一个要运行的网站提供单独的 `Nginx` 服务器。
- `listen` ：用来配置 “虚拟服务器” 监听的 `ip` 和 `port`，只能配置在 `server` 块中。具体语法如下：

    ```bash
    # 只监听来自 127.0.0.1 这个 IP，请求 8000 端口的请求
    listen 127.0.0.1:8000;
    # 只监听来自 127.0.0.1 这个IP，请求 80端 口的请求（不指定端口，默认80）
    listen 127.0.0.1;
    # 监听来自所有 IP，请求 8000 端口的请求
    listen 8000;
    # 监听 80 端口的请求，且如果没有其他 server_name 能匹配上的话将会默认匹配该 server
    listen 80 default_server;
    ```

- `root` ：nginx是通过alias设置虚拟目录，在nginx的配置中，alias目录和root目录是有区别的：
  - alias指定的目录是准确的，即location匹配访问的path目录下的文件直接是在alias目录下查找的；
  - root指定的目录是location匹配访问的path目录的上一级目录,这个path目录一定要是真实存在root指定目录下的；
  - alias虚拟目录配置中，location匹配的path目录如果后面不带"/"，那么访问的url地址中这个path目录后面加不加"/"不影响访问，访问时它会自动加上"/"；
  - 如果location匹配的path目录后面加上"/"，那么访问的url地址中这个path目录必须要加上"/"，访问时它不会自动加上"/"。如果不加上"/"，访问就会失败；
  - root目录配置中，location匹配的path目录后面带不带"/"，都不会影响访问。
- `location` ：`location` 指令可以让 `server` 可以非常灵活的处理请求。

由此，我们最核心的配置就是`location` 的配置，用来告诉`Nginx`访问`/`的时候，怎么处理资源。

不仅如此，我们可以配置`Nginx`来让网站使用`HTTPS`。

首先，我们需要去阿里云申请的免费`SSL`证书页面进行证书下载。这里选择`Nginx`服务器类型进行下载。

下载证书成功后会有一个`zip`压缩包，里面包括两个文件，后缀分别是`.pem`和`.key` 。我们将文件重命名为`server.pem`和`server.key` 。

然后我们登录到服务器，创建存放证书文件的文件夹：

```bash
# 进入 nginx 配置目录
cd /etc/nginx

# 创建目录存放证书
mkdir cert
```

然后将我们下载到本地的证书放至`cert`目录下。这里使用`scp`命令进行远程文件传输。

```bash
scp -r server.key root@124.223.xx.xx:/etc/nginx/cert
scp -r server.pem root@124.223.xx.xx:/etc/nginx/cert
```

然后查看服务器`cert`目录下是否已传输成功。

```bash
[root@VM-12-15-centos cert]# ls
server.key  server.pem
```

下面开始配置。

进入`/etc/nginx` ，执行`vim nginx.conf` 。整体配置如下：

```bash
server {
    listen       80;
    root         /usr/share/nginx/html;
    server_name  _;
        rewrite ^(.*)$ https://$host$1;

    location / {
        alias /usr/share/nginx/html/dist/;
        index index.html;
    }
}

server {
    listen       443 ssl;
    server_name  www.qukun.com.cn;

    ssl_certificate cert/server.pem;
    ssl_certificate_key cert/server.key;
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        alias /usr/share/nginx/html/dist/;
        index index.html;
    }
}
```

在`http`的配置中，我们写了一个 `rewrite` 语句，重定向所有的 `http` 请求到 `https` 请求。

在`https`的配置中，通过`server_name` 指定证书绑定的域名。`ssl_certificate`和`ssl_certificate_key`指定证书文件和证书私钥文件。

修改完成之后，重载`nginx`配置：

```bash
nginx -s reload
```

至此，我们的服务器环境就搭建完成了。

## 源码部署

博客是采用`vue-press` 快速搭建而成，每个页面都是一个`markdown` 文件。源码部署的步骤如下：

```bash
# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress

scp -r $(pwd)/dist root@124.223.xx.xx:/usr/share/nginx/html
```

执行完上述命令后，服务器的`/usr/share/nginx/html/dist` 目录下，就存放着我们的静态文件。

最后，访问[https://www.qukun.com.cn/](https://www.qukun.com.cn/) ，一切顺利。

## Github Actions

我们可以借助github提供的工作流达到自动打包并部署的目的。首先在项目根目录下新建文件夹`.github/workflows` ，在文件夹下新建文件`deplay.yml` ，文件名可以随便起一个。内容如下：

```yaml
# This is a basic workflow to help you get started with Actions

name: deploy

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2
      - name: install Node.js
        uses: actions/setup-node@v2.5.0
        with:
          node-version: "14.X"
      - name: install dep
        run: npm install
      - name: build app
        run: npm run docs:build
      - name: copy file via ssh password
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          password: ${{ secrets.REMOTE_PASS }}
          port: 22
          source: "docs/"
          target: ${{ secrets.REMOTE_TARGET }}
```

核心配置是工作流的步骤，共分为两步：安装依赖及打包和ssh文件到指定服务器。具体的配置可以参考官方文档，这里就不赘述了。这里还使用到了四个变量，变量的添加入口位于`github`项目的**Settings→Actions secrets→New repository secret**。工作流里的变量会自动去里面查找。

这里我们直接将打包过后的docs文件放至服务器的指定目录`target`下。最终的静态资源路径是`docs/.vuepress/dist` ，因此这里需要稍微修改下`nginx.conf`配置。将配置中alias后面的`/usr/share/nginx/html/dist/`修改为`/usr/share/nginx/html/docs/.vuepress/dist/` 即可。最后别忘了重载`nginx`配置。

## 总结

本文记录了从零部署前端环境的步骤，其中购买域名、购买服务器、以及网站的备案需要大家自己进行操作。重点记录了安装依赖的具体步骤，以及配置`nginx`的具体步骤。

同时集成了CI/CD，可以将代码推送到github的同时自动打包并部署到服务器。
