# 使用

## 设置全局 npm

`npm config set --global @huize:registry=http://123.56.117.8:4873`

## 全局安装 cli

`npm install @huize/react-template-cli -g`

## 使用命令创建项目

`huize-cli create [projectName]`

# 工具包

## [commander](https://github.com/tj/commander.js/tree/master)

创建 cli 命令，包括接收参数等

## [Inquirer](https://github.com/SBoudrias/Inquirer.js)

命令行交互框

## [glob](https://github.com/isaacs/node-glob)

获取执行命令行文件夹下的所有文件

# 调试与发布

`pnpm i` `npm run test` `npm publish --registry `
