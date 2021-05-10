# Nginx代理proxy pass配置去除前缀

在项目开发中，会遇到门户网站需要根据统一的前缀代理到其他服务器，在此记录下nginx的相关配置。

## 不加前缀的配置

大多数的情况下，我们都是配置的没有前缀，比如访问跟路径代理到本地的8088端口。

```conf
upstream one {
  server localhost:8088 weight=5;
}

server {
    listen              80;
    server_name         localhost;
    access_log  "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G"  main;

    location / {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://one;
    }

}
```

## 加前缀的配置

上游的配置增加前缀是为了方便统一代理，但是下游的服务其实是不关心前缀的，那么可以通过nginx的配置将该前缀去除。

### 方案一：proxy_pass后面加根路径/

```conf
server {
    listen              80;
    server_name         localhost;
    access_log  "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G"  main;

    location ^~/user/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://user/;
    }

    location ^~/order/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://order/;
    }

}
```

`^~/user/`表示匹配前缀是`user`的请求，`proxy_pass`的结尾有`/`， 则会把`/user/*`后面的路径直接拼接到后面，即移除`user`。

### 方案二：使用rewrite

```conf
upstream user {
  server localhost:8089 weight=5;
}
upstream order {
  server localhost:8090 weight=5;
}


server {
    listen              80;
    server_name         localhost;
    access_log  "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G"  main;

    location ^~/user/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        rewrite ^/user/(.*)$ /$1 break;
        proxy_pass http://user;
    }

    location ^~/order/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        rewrite ^/order/(.*)$ /$1 break;
        proxy_pass http://order;
    }

}
```

## 修改前端配置

修改`nginx`配置的同时，前端也需要同步修改。其实很简单，在每一个调用的接口前加上统一的前缀即可，以`axios`为例：

```js
import axios from 'axios'

axios.defaults.baseURL = '/common-api' // 与nginx保持一直
```
