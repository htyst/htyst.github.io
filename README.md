# Stonespace · 侯廷一的个人主页

数学、代码与日落之间，记录学习与成长。

**[访问网站 →](https://htyst.github.io/)** · [学习笔记](https://htyst.github.io/#notes) · [文章归档](https://htyst.github.io/archive.html)

## 关于这个空间

这里收集我的课程学习、编程实践与日常思考。主页采用深蓝灰配色、日落风景与半透明玻璃卡片，兼顾桌面和手机阅读。

- **数学与课程**：概念、推导与理解的过程。
- **代码与项目**：编程尝试、实现方法与问题记录。
- **文字与日常**：值得留下的片段与想法。

## 内容维护

| 内容 | 位置 |
| --- | --- |
| 首页内容与视觉样式 | `index.html` |
| 个人介绍 | `about.md` |
| 学习笔记与文章 | `_posts/` |
| 网站名称、作者及插件设置 | `_config.yml` |
| 文章与归档页的补充样式 | `_sass/custom.scss` |
| 导航菜单 | `_data/navigation.yml` |
| 构建检查 | `.github/workflows/jekyll.yml` |

新增文章时，在 `_posts/` 中创建 `YYYY-MM-DD-title.md`，例如：

```markdown
---
layout: article
title: 一次新的学习记录
---

在这里写正文。
```

首页会自动展示最新的五篇文章，全部文章可在归档页查看。

## 本地预览

先安装 Ruby 3.1 和 Bundler，然后在仓库目录执行：

```bash
bundle install
bundle exec jekyll serve
```

打开终端提示的本地地址，通常为 `http://127.0.0.1:4000/`。修改 `_config.yml` 后需重新启动预览。

提交前可运行：

```bash
bundle exec jekyll build --trace
```

## 发布方式

将修改推送到 `main` 后：

1. **Jekyll Build Check** 检查构建结果及关键页面、样式文件。
2. GitHub Pages 的 **pages build and deployment** 工作流负责正式部署。

在仓库的 [Actions](https://github.com/htyst/htyst.github.io/actions) 页面确认两条工作流均通过，再访问网站查看更新。README 不参与网页内容展示。

## 技术与致谢

基于 Jekyll、GitHub Pages 与 [TeXt Theme](https://github.com/kitian616/jekyll-TeXt-theme)，首页使用独立 HTML/CSS，文章页沿用主题布局。依赖见 `Gemfile`。

代码许可见 [LICENSE](LICENSE)。

> 温柔而坚定，清醒且好奇。
