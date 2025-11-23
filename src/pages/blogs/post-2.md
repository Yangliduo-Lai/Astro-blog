---
layout: ../../layouts/MarkdownPostLayout.astro
title: '在 WSL2 中部署 Docker 环境'
pubDate: 2025-11-19
lastUpdateDate: 2025-11-19
description: ''
tags: [WSL, Docker]
languages: []
---

# 准备工作

确保已安装 WSL2：[WSL2 安装参考](https://yangliduolai.netlify.app/posts/post-1/)

# 使用 Docker Desktop

1. 从官网下载 [Docker Desktop](https://www.docker.com/products/docker-desktop/)；
2. 启用 WSL 集成

    打开 Docker Desktop：
    
    Settings → Resources → WSL Integration
    
    勾选：
    
    - “Enable integration with my default WSL distro”
    - “Ubuntu”

3. 在 WSL2 下使用 systemd

    如果使用的是 2023 之后的 Windows WSL，WSL 已支持 systemd！

    只需修改 `/etc/wsl.conf`：

    ```bash
    sudo nano /etc/wsl.conf
    ```

    加入：

    ```bash
    [boot]
    systemd=true
    ```

4. 重启 WSL

    在 Windows 终端执行：

    ```bash
    wsl --shutdown
    ```

    然后重新打开 Ubuntu，再试：

    ```bash
    systemctl --version

    docker version
    docker run hello-world
    ```