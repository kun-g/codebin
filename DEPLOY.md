# 将Next.js项目部署到Cloudflare Pages

本文档详细介绍如何将Next.js项目作为静态站点部署到Cloudflare Pages。

## 准备工作

### 1. 修改Next.js配置以支持静态导出

首先，需要修改`next.config.js`文件以启用静态导出功能：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 禁用图像优化功能，因为它需要Node.js服务器
  images: {
    unoptimized: true,
  },
  // 确保资源路径正确
  basePath: '',
  // 如果您的网站不在域名根目录下，请设置assetPrefix
  // assetPrefix: '/your-base-path',
}

module.exports = nextConfig
```

### 2. 确保应用兼容静态导出

检查并修改您的代码，确保：

- 不使用仅在服务器端可用的API（如直接的数据库访问）
- 不使用需要服务器端渲染的Next.js功能（如`getServerSideProps`）
- 如果使用数据获取，请使用`getStaticProps`和`getStaticPaths`
- 避免使用动态路由，除非通过`getStaticPaths`预渲染

## 构建项目

运行以下命令构建并导出您的项目：

```bash
npm run build
```

这将在项目根目录下创建一个`out`文件夹，其中包含所有静态文件。

## 部署到Cloudflare Pages

### 1. 准备Git仓库

确保您的项目已上传到GitHub、GitLab或Bitbucket等Git仓库。

### 2. 登录Cloudflare控制台

1. 访问[Cloudflare控制台](https://dash.cloudflare.com/)并登录
2. 在侧边栏中点击"Pages"

### 3. 创建新项目

1. 点击"创建项目"按钮
2. 选择"连接Git"选项
3. 选择包含您项目的Git提供商（GitHub、GitLab等）
4. 授权Cloudflare访问您的仓库
5. 从列表中选择要部署的仓库

### 4. 配置构建设置

在配置页面上：

1. 项目名称：输入您喜欢的名称（这将决定默认的*.pages.dev URL）
2. 生产分支：选择您要部署的分支（通常是`main`或`master`）
3. 构建设置：
   - 构建命令：`npm run build`
   - 构建输出目录：`out`
   - 构建系统版本：选择最新版本
4. 环境变量（如需）：添加项目所需的任何环境变量

### 5. 保存并部署

1. 点击"保存并部署"按钮
2. Cloudflare Pages将开始构建和部署您的站点
3. 完成后，您将收到一个`*.pages.dev`域名，可以通过该域名访问您的站点

## 自定义域名设置（可选）

如果您想使用自己的域名：

1. 在项目的Pages控制台中，点击"自定义域"标签
2. 点击"设置自定义域"
3. 输入您想使用的域名（例如`example.com`或`www.example.com`）
4. 按照说明更新您的DNS设置
   - 如果您的域名已经使用Cloudflare进行DNS管理，这个过程会更简单
   - 如果不是，您需要在您的DNS提供商处添加CNAME记录

## 持续部署

设置完成后，每当您将更改推送到指定的Git分支时，Cloudflare Pages将自动重新构建和部署您的网站。

## 常见问题解决

### 路由问题

如果您遇到路由问题，请检查：
- 确保`next.config.js`中的`trailingSlash`设置适合您的需求
- 确保所有链接使用正确的相对路径

### 构建失败

如果构建失败：
- 检查Cloudflare Pages构建日志查找错误
- 确保您的项目在本地使用`npm run build`命令能成功构建
- 确保`package.json`中包含所有必要的依赖

### 资源加载问题

如果静态资源（如图像、CSS或JavaScript）无法加载：
- 确认`next.config.js`中的`basePath`和`assetPrefix`设置是否正确
- 检查网络请求，确保资源路径无误

## 参考资源

- [Next.js静态导出文档](https://nextjs.org/docs/advanced-features/static-html-export)
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/) 