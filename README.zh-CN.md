<p align='center'>
  <img src='./public/logo.png' alt='DataGram' height='200'/>
</p>

# DataGram

![vue.js3](https://img.shields.io/badge/-Vue.js%203-brightgreen) ![vite](https://img.shields.io/badge/-Vite-orange) ![typescript](https://img.shields.io/badge/-TypeScript-blue)

[English](README.md) | 简体中文

## 介绍

DataGram 是一个现代数据可视化和分析工具，利用最新的前端技术栈，包括但不限于 Vue.js 3、Vite 和 TypeScript。它使用 AntV 图表作为其数据驱动引擎，使用户能够轻松地创建交互式且激动人心的数据可视化。有了 DataGram，用户可以快速、轻松地理解复杂的数据集，发现隐藏的洞察力，并做出数据驱动的决策。无论你是商业专家、研究人员，还是只是想从数据中获得洞察力的人，DataGram 都有你需要的工具和功能，可以将你的数据变成可操作的信息。

## 背景

DataGram 是我 2023 年的毕业设计项目，在朱老师的指导下完成。如果没有必要，我将不会更新这个项目。

## 功能

### 系统管理

- 用户可以注册、登录、重置密码等。
- 管理员可以控制用户创建仪表盘的权限。非付费用户最多只能创建两个仪表盘，付费用户可以创建无限的仪表盘。
- 管理员可以记录、查看和搜索系统操作日志。

### 图表制作

- 支持创建、重命名和删除仪表盘。
- 支持使用拖拉拽的方式在线快速构建仪表盘。
- 支持图表样式设置。
- 支持将仪表盘导出为图片。
- 支持创建公共链接以分享仪表盘。

### 数据连接

- 支持多种数据集，如 Excel 文件及 API 数据源等。
- 支持上传并在云端管理数据源。

## 截图

![sc2](/screenshots/sc2.png)
![sc1](/screenshots/sc1.png)
![sc3](/screenshots/sc3.png)
![sc4](/screenshots/sc4.png)
![sc5](/screenshots/sc5.png)

## 安装

这个项目使用了 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)。请在安装之前检查它们是否已经安装在环境中。

另外，该项目依赖后端和数据库。请查看 [datagram-api](https://github.com/GeniusCorn/datagram-api).

```shell
# 克隆项目
git clone https://github.com/GeniusCorn/datagram.git

# 进入项目目录
cd datagram

# 安装依赖
pnpm i

# 开发
pnpm dev

# 构建
pnpm build

# 预览
pnpm preview
```

### 环境变量

```.env
# 后端接口地址
VITE_API_URL = 'http://...'
```

## 维护者

[![@GeniusCorn](https://avatars.githubusercontent.com/u/12198452?s=150&v=4)](https://github.com/GeniusCorn)
[@GeniusCorn](https://github.com/GeniusCorn)

## 使用许可

[MIT](license.md)
