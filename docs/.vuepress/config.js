const guide = require("./config/guide");
const article = require("./config/article");
const notes = require("./config/notes");
const path = require('path');
const fs = require('fs');
module.exports = {
  title: "chuck",
  description: 'hi，我是卡卡。一名F2Eer',
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
  base: '/',
  themeConfig: {
    logo: '/img/logo.png',
    smoothScroll: true, //平滑滚动
    sidebarDepth: 1,
    repo: "FrontToEnd/vuepress-blog",
    docsRepo: "FrontToEnd/vuepress-blog",
    docsBranch: "main",
    editLinks: true, // 编辑链接
    editLinkText: "帮助我改善这个页面", // 链接字段
    lastUpdated: "最后更新时间", // 最后更新时间
    nav: [{
        text: '🍧首页',
        link: '/'
      },
      {
        text: '🏆规范',
        link: '/guide/'
      },
      {
        text: '📒文章',
        link: '/article/'
      },
      {
        text: '📚笔记',
        link: '/notes/'
      },
      // {
      //   text: "🌱其他",
      //   items: [
      //     {
      //       text: "git",
      //       link: "/other/git/",
      //     },
      //   ],
      // },
    ],
    sidebar: {
      '/guide/': guide.guide,
      '/article/': article.article,
      '/notes/': notes.notes
    },
    backToTop: true, // 置顶按钮
  },
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features'); // fix core-js error
  }
}