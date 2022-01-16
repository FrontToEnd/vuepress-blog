const article = [
  {
    title: "项目优化实践",
    collapsable: true,
    children: [
      "optimize/vue_optimize_gzip",
      "optimize/vue_optimize_webpack",
      "optimize/vue_optimize_branch",
      "optimize/vue_optimize_standard",
      "optimize/vue_optimize_commit",
      "optimize/vue_optimize_debounce",
      "optimize/tailwindcss",
      "optimize/Performance",
      "optimize/前端性能优化原理与实践",
    ],
  },
  {
    title: "技术体系",
    collapsable: true,
    children: ["system/css硬件加速", "system/取消请求"],
  },
  {
    title: "技术探索",
    collapsable: true,
    children: [
      "explore/zqy_cli",
      "explore/npm",
      "explore/browser_render",
      "explore/browser_userAgent",
      "explore/OSS",
      "explore/sentry",
      "explore/wasm",
      "explore/nvm",
      "explore/jsPlumb",
      "explore/nginx",
      "explore/excel",
      "explore/jest",
      "explore/jest_02",
      "explore/download",
      "explore/JSON",
      "explore/bpmn",
      "explore/原生开发探索",
      "explore/relative_time",
    ],
  },
  {
    title: "技术总结",
    collapsable: true,
    children: [
      "tech/fe_train",
      "tech/renderer",
      "tech/yunxi",
      "tech/design_document",
      "tech/technology_research",
    ],
  },
  {
    title: "vue相关",
    collapsable: true,
    children: [
      "vue3/vue3.0",
      "vue3/mitt",
      "vue3/Functional_Components",
      "vue3/vite中集成tailwindcss",
    ],
  },
  {
    title: "CSS",
    collapsable: true,
    children: ["css/filter和backdrop-filter", "css/css_property"],
  },
  {
    title: "代码片段",
    collapsable: true,
    children: [
      "code/code_fragment",
      "code/sass",
      "code/verify_utils",
      "code/ramda",
      "code/不规则图形",
    ],
  },
  {
    title: "资源收集",
    collapsable: true,
    children: [
      "resource/resource",
      "resource/2021前端必读",
      "resource/web站点",
    ],
  },
  {
    title: "杂记",
    collapsable: true,
    children: ["notes/OTC", "notes/MAC", "notes/time"],
  },
];

module.exports = {
  article,
};
