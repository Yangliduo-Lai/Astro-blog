---
layout: ../../layouts/MarkdownPostLayout.astro
title: '从零构建个人博客：网站搭建记录'
pubDate: 2025-11-18
lastUpdateDate: 2025-11-19
description: '是先有网站搭建博客还是先有搭建博客网站？'
tags: [WSL, Astro, Netlify]
languages: [Astro, HTML, CSS, JavaScript, Markdown]
---
# A quick start

# 技术栈

- 环境：WSL2
- 前端框架：Astro
- 部署：Netlify

# 代码日记

## 环境配置

### 安装和配置 WSL

1. 安装 WSL

    在 PowerShell （管理员）中执行：

    ```bash
    wsl --install
    ```

    这将自动安装 WSL2 和 Ubuntu（重启后完成安装）。

2. 更新 Ubuntu 软件包

    打开 Ubuntu（通过开始菜单）：

    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

### 在 WSL 中安装 Node.js

1. 安装 nvm

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source ~/.bashrc
    ```

2. 安装 Node.js LTS

    ```bash
    nvm install 18
    nvm use 18
    node -v
    npm -v
    ```

    应该可以看到 node 和 npm 的版本号。

### 创建 Astro 博客项目

在 WSL 的项目目录中操作：

```bash
# 新建一个博客项目目录
mkdir astro-blog
cd astro-blog

# 创建 Astro 项目
npm create astro@latest
```

启动项目：

```bash
npm run dev
```

默认访问地址是：

```plaintext
http://localhost:4321
```

### VS Code + WSL 插件

使用 VS Code 作为 IDE。

1. 安装 [WSL 插件](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
2. 在 Windows 中打开 VS Code
3. 按下 `Ctrl + Shift + P` → 先 connect to WSL → 输入并选择 `WSL: Open Folder`
4. 选择你的 `astro-blog` 项目文件夹

## 第一篇博客

Basic blog without any other function.

参考：[搭建你的第一个 Astro 博客](https://docs.astro.build/zh-cn/tutorial/0-introduction/)

1. 博客文件

位置：`src/pages/posts/post.md`

结构：

```markdown
---
Frontmatter（前言区块），用来为当前页面声明元数据（metadata）和页面配置。
它不会直接渲染到页面上，但会被 Astro 在构建时读取，用来控制页面布局、SEO、排序、显示等功能。

# 博客布局文件
layout: ../../layouts/Layout.astro
    
# 文章标题
title: 'xxx'
# 文章描述
description: 'xxx'
......
---
Markdown 语言：博客主要内容。
``` 

2. 布局文件

位置：`src/layouts/Layout.astro`

结构：

```html
---
Frontmatter

# 使用 props 从 Frontmatter 读取数据
const { frontmatter } = Astro.props;
---
<html lang="zh-CN">
    <head>
    	<meta charset="utf-8" />
    	<title>{frontmatter.title}</title>
    </head>
    <body>
    </body>
</html>
<style>
</style>
```

布局文件嵌套

```html
---
import BaseLayout from './BaseLayout.astro';
---
<BaseLayout pageTitle={frontmatter.title}>
</BaseLayout>
```

## 添加 Tailwind 4 支持以优化内容样式

[添加 Tailwind 4 支持参考](https://docs.astro.build/zh-cn/guides/styling/#%E6%B7%BB%E5%8A%A0-tailwind-4-%E6%94%AF%E6%8C%81)

### 自定义代码块样式

1. 更换 markdown 主题/自动换行

    （暂时只支持单一主题，即无明暗交替）。

    [Shiki 语法高亮器参考](https://docs.astro.build/zh-cn/reference/configuration-reference/#markdownshikiconfig)

    [Shiki 可选主题参考](https://textmate-grammars-themes.netlify.app/)

2. 修改代码块的边框和背景样式

    [`@layer` 用法参考](https://tailwindcss.com/docs/adding-custom-styles?utm_source=chatgpt.com) 

    [`@apply` 用法参考](https://tailwindcss.com/docs/functions-and-directives#apply)

    ```css
    @import "tailwindcss";

    @layer components {
    .astro-code {
        background-color: #1a1b26 !important;
        border-color: theme('colors.zinc.700');
        border-width: 1px;
        border-radius: theme('borderRadius.lg');
        padding: theme('spacing.4');
        margin-top: theme('spacing.6');
        margin-bottom: theme('spacing.6');
        width: 100%;
        display: block;
        overflow: hidden;
    }
    /* 内部 <pre> 标签 */
    .astro-code pre {
        @apply m-0                  /* 去掉默认 margin */
            overflow-x-auto         /* 支持横向滚动 */
            leading-relaxed         /* 行高 */
            text-sm;                /* 字体大小 */
    }
    /* 内部 <code> 标签 */
    .astro-code code {
        @apply font-mono               /* 使用等宽字体 */
            whitespace-pre;         /* 保留空白 */
    }
    }
    ```