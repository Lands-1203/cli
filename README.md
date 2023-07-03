https://juejin.cn/post/7251391372394250299
# 使用

## 设置全局 npm

`npm config set --global @huize:registry=http://123.56.117.8:4873`

## 全局安装 cli

`npm install @huize/react-template-cli -g`

## 使用命令创建项目

`huize-cli create [projectName]`

# 工具包

| 包名                                                          | 作用                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [commander](https://github.com/tj/commander.js/tree/master)   | 如果我们把 bin 下面的命令 huize-cli 称作一级命令，该命令是创建给系统识别的，那么[commander](https://github.com/tj/commander.js/tree/master)工具包会创建对应的子命令和参数，使用该工具包就可以得到用户的子命令（create）、参数等。以及可以创建该命令的描述：例如`huize-cli help` 、`huize-cli create --help` 。具体使用方式，见[官方文档](https://github.com/tj/commander.js/tree/master) |
| [@inquirer/prompts](https://github.com/SBoudrias/Inquirer.js) | 它是一个用于在命令行端与用户交互的工具包，在使用[commander](https://github.com/tj/commander.js/tree/master)得到用户命令和参数后，我们接下来就需要对用户进行一些提问，比如项目名称是什么、版本等信息。该工具包支持输入、选择、确认等基本交互                                                                                                                                              |
| [glob](https://github.com/isaacs/node-glob)                   | 查文件的，在该项目中主要是用于查询当前命令行路径下的所有文件名称，避免冲突。                                                                                                                                                                                                                                                                                                             |
| [execa](https://github.com/sindresorhus/execa#readme)         | 这是一个用于创建 cmd 执行命令的工具。在该项目中主要担任执行 git 克隆和`pnpm i`包下载。                                                                                                                                                                                                                                                                                                   |
| path                                                          | 拼接系统中的绝对路径，由于 windows 和 ios 的路径规则不一样，它就能很好的解决这个问题。                                                                                                                                                                                                                                                                                                   |
| [fs-extra](https://github.com/jprichardson/node-fs-extra)     | 读写文件。在该项目中，主要用于读取 clone 项目的 package.json，修改其 name 属性等。                                                                                                                                                                                                                                                                                                       |

获取执行命令行文件夹下的所有文件

# 调试与发布

`pnpm i` `npm run test` `npm publish`
