<p align='center'>
  <img src='./public/logo.png' alt='DataGram' height='200'/>
</p>

# DataGram

![vue.js3](https://img.shields.io/badge/-Vue.js%203-brightgreen) ![vite](https://img.shields.io/badge/-Vite-orange) ![typescript](https://img.shields.io/badge/-TypeScript-blue)

English | [简体中文](README.zh-CN.md)

## Introduction

DataGram is a powerful data visualization and analysis tool that allows users to easily explore and understand complex data sets. With its intuitive interface and comprehensive set of features, DataGram makes it simple for users to create beautiful, interactive charts and graphs that can be easily shared and analyzed. Whether you're a business professional, a researcher, or simply someone looking to gain insights from your data, DataGram has the tools you need to turn your data into actionable information.

## Background

DataGram is my graduation project in 2023, completed under Mr. Zhu's guidance. If not necessary, I will not update this project.

## Features

### System management

- Users can register, log in, reset their password, and the like.
- Admins can control users' permission to create dashboards. Non-paying users can only make up to two dashboards, and paying users can create unlimited ones.
- Admins can record, view, and search system operation logs.

### Chart creation

- Support for the creation, renaming, and deletion of dashboards.
- Support for quick construction of dashboards online using drag-and-drop.
- Support for chart style settings.
- Support for exporting dashboards to images.
- Support creating public links to share dashboards.

### Data connectivity

- Support multiple data sets, such as Excel files and API data sources.
- Support for uploading and managing data sources in the cloud.

## Screenshots

![sc2](/screenshots/sc2.png)
![sc1](/screenshots/sc1.png)
![sc3](/screenshots/sc3.png)
![sc4](/screenshots/sc4.png)
![sc5](/screenshots/sc5.png)

## Install

This project uses [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/). Go check them out if you need to install them locally.

Besides, the project requires a back-end and database. Go check [datagram-api](https://github.com/GeniusCorn/datagram-api).

```shell
# clone the project
git clone https://github.com/GeniusCorn/datagram.git

# enter the project directory
cd datagram

# install dependency
pnpm i

# develop
pnpm dev

# build
pnpm build

# preview
pnpm preview
```

### Environment variables

```.env
# the back-end interface url
VITE_API_URL = 'http://...'
```

## Maintainer

[![@GeniusCorn](https://avatars.githubusercontent.com/u/12198452?s=150&v=4)](https://github.com/GeniusCorn)
[@GeniusCorn](https://github.com/GeniusCorn)

## License

[MIT](license.md)
