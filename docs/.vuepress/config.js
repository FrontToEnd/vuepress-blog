const path = require('path');
const fs = require('fs');
module.exports = {
  title: '智器云',
  description: '智器云大数据前端开发规范',
  head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }] // 自定义favicon
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'antdocs', // https://antdocs.seeyoz.cn/
  plugins: [
    [
      'vuepress-plugin-helper-live2d', { // https://github.com/JoeyBling/vuepress-plugin-helper-live2d
        // 是否开启控制台日志打印(default: false)
        log: false,
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'hibiki',
          display: {
            position: "right", // 显示位置：left/right(default: 'right')
            width: 135, // 模型的长度(default: 135)
            height: 300, // 模型的高度(default: 300)
            hOffset: 65, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: false // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 0.8 // 模型透明度(default: 0.8)
          }
        }
      }
    ]
  ],
  base: '/f2e_standred/',
  // base: '/',
  themeConfig: {
    logo: '/img/logo.png',
    nav: [{
        text: '首页',
        link: '/'
      },
      {
        text: '规范',
        link: '/guide/JavaScript.html'
      },
      {
        text: '文章',
        link: '/article/optimize/vue_optimize_gzip.html'
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '规范',
          collapsable: true, // 可折叠
          children: [
            'JavaScript',
            'CSS',
            'HTML',
            'Code',
            'Vue',
          ]
        },
        {
          title: '优化',
          collapsable: true,
          children: [
            'Optimize'
          ]
        }
      ],
      '/article/': [
        {
          title: '项目优化实践',
          collapsable: true,
          children: [
            'optimize/vue_optimize_gzip',
            'optimize/vue_optimize_webpack',
            'optimize/vue_optimize_branch',
            'optimize/vue_optimize_standard',
            'optimize/vue_optimize_commit',
            'optimize/tailwindcss',
            'optimize/Performance',
          ]
        },
        {
          title: '技术探索',
          collapsable: true,
          children: [
            'explore/zqy_cli',
            'explore/npm',
            'explore/browser_render',
            'explore/browser_userAgent',
            'explore/OSS',
            'explore/sentry',
            'explore/wasm',
            'explore/nvm',
            'explore/jsPlumb',
            'explore/css_property',
            'explore/nginx',
            'explore/excel',
            'explore/jest',
            'explore/jest_02',
            'explore/download',
            'explore/JSON',
          ]
        },
        {
          title: '技术总结',
          collapsable: true,
          children: [
            'tech/fe_train',
            'tech/renderer',
            'tech/yunxi',
            'tech/design_document',
            'tech/technology_research',
          ]
        },
        {
          title: 'vue相关',
          collapsable: true,
          children: [
            'vue3/vue3.0',
            'vue3/mitt',
            'vue3/Functional_Components',
          ]
        },
        {
          title: '代码片段',
          collapsable: true,
          children: [
            'code/code_fragment',
            'code/sass',
            'code/verify_utils',
            'code/ramda'
          ]
        },
        {
          title: '资源收集',
          collapsable: true,
          children: [
            'resource/resource',
          ]
        },
        {
          title: '杂记',
          collapsable: true,
          children: [
            'notes/OTC',
            'notes/MAC',
            'notes/time'
          ]
        },
      ],
    },
    backToTop: true, // 置顶按钮
  },
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features'); // fix core-js error
  }
}