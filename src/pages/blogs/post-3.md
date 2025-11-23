---
layout: ../../layouts/MarkdownPostLayout.astro
title: '在 WSL2 中部署 conda 环境'
pubDate: 2025-11-19
lastUpdateDate: 2025-11-19
description: ''
tags: [WSL, Conda]
languages: []
---

# 下载安装 Anaconda

1. 获取最新 Anaconda 安装脚本
    
    ```bash
    # 并非准确
    wget https://repo.anaconda.com/archive/Anaconda3-latest-Linux-x86_64.sh
    ```
    
2. 安装脚本
    
    ```bash
    # 并非准确
    bash Anaconda3-latest-Linux-x86_64.sh
    ```
    
    安装过程要点：
    
    - 询问是否同意 license → 输入 yes
    - 选择安装路径（默认即可）→ 回车
    - 是否将 conda 初始化到 `.bashrc` 中 → 输入 yes

3. 激活 conda
    
    加载更新后配置：
    
    ```bash
    source ~/.bashrc
    ```
    
    验证：
    
    ```bash
    conda --version
    ```
    

# Anaconda 创建隔离环境

    ```bash
    conda create -n myenv python=3.11
    conda activate myenv
    conda deactivate

    # 导出环境与重建
    conda env export > environment.yml
    conda env create -f environment.yml
    ```
