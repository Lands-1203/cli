import * as inquirer from "@inquirer/prompts";
import chalk from "chalk";
import { program } from "commander";
import execa from "execa";
import fs from "fs-extra";
import { glob } from "glob";
import path from "path";
import prettier from "prettier";

import { description, name, version } from "../../package.json";
export type templateValueType =
  | "micro"
  | "master"
  | "Single"
  | "components"
  | "bpmn";

interface gitPathMapProps {
  ssh: Record<templateValueType, string>;
  https: Record<templateValueType, string>;
}
const giPathMap: gitPathMapProps = {
  ssh: {
    micro:
      "git@github.com:Lands-1203/cli.git",
    master:
      "git@github.com:Lands-1203/cli.git",
    Single:
      "git@github.com:Lands-1203/cli.git",
    components:
      "git@github.com:Lands-1203/cli.git",
    bpmn: "git@github.com:Lands-1203/cli.git"
  },
  https: {
    micro:
      "https://github.com/Lands-1203/cli.git",
    master:
      "https://github.com/Lands-1203/cli.git",
    Single:
      "https://github.com/Lands-1203/cli.git",
    components:
      "https://github.com/Lands-1203/cli.git",
    bpmn: "https://github.com/Lands-1203/cli.git",
  },
};
export default function run() {
  program.name(name).description(description).version(version);

  program
    .command("create")
    .description("创建模版项目")
    .argument("[project-name]<string>", "项目名称")
    // .option("-s, --separator <char>", "分隔符", ",")
    .action(async (projectName) => {
      if (!projectName) {
        projectName = await inquirer.input({ message: "请输入你的项目名称?" });
      }
      if (!projectName) {
        program.parse();
        return;
      }
      const fileList = await glob("*");

      if (fileList.includes(projectName)) {
        console.log(chalk.red("文件已存在，退出!"));
        process.exit(process.exitCode);
      }
      const templateValue = await inquirer.select<templateValueType>({
        message: "请选择需要导入的模版",
        choices: [
          {
            name: "🚀 主应用模版",
            value: "master",
            description:
              "umi4主应用模版 qiankun引擎 pro-component组件库 @huize/react-components私有库 动态主题 快捷菜单",
          },
          {
            name: "🎯 微应用模版",
            value: "micro",
            description:
              "umi4微应用模版 qiankun引擎 pro-component组件库 @huize/react-components私有库 动态主题 快捷菜单",
          },
          new inquirer.Separator(),
          {
            name: "🔧 单应用模版",
            value: "Single",
            description:
              "umi4单应用模版 pro-component组件库 @huize/react-components私有库 动态主题 快捷菜单",
          },
          new inquirer.Separator(),
          {
            name: "📚 组件库",
            value: "components",
            description: "dumi组件库  pro-component组件库",
          },
          new inquirer.Separator(),
          {
            name: "⚙️ 流程设计器demo",
            value: "bpmn",
            description:
              "一个通过bpmnjs实现的流程设计器，使用三方组件实现属性面板",
          },
          new inquirer.Separator(),
          {
            name: "📝 小程序线上签约demo",
            value: "sign",
            description: "一个实现E签宝签约认证流程的业务模拟",
          },
        ],
      });
      const gitTypeValue = await inquirer.select<"ssh" | "https">({
        message: "请选择本地配置的git方式",
        choices: [
          {
            name: "🔑ssh",
            value: "ssh",
          },
          {
            name: "🔐https",
            value: "https",
          },
        ],
      });
      let gitPath = giPathMap[gitTypeValue][templateValue];
      try {
        console.log(`🚚 clone repo url: ${gitPath}`);
        // execSync(`git clone ${gitPath} ${projectName}`);
        await execa(
          `git`,
          [`clone`, gitPath, `--depth=1`, projectName],
          process.env.TEST
            ? {}
            : {
                stdout: process.stdout,
                stderr: process.stderr,
                stdin: process.stdin,
              }
        );
        console.log(chalk.green(`✅下载 ${templateValue} 成功`));
      } catch (error) {
        console.log(chalk.redBright(`❌模版下载失败`), error);
      }
      try {
        // 获取项目中的 package.json 文件路径
        const packageJsonPath = path.resolve(projectName, "package.json");

        // 加载 package.json 文件内容
        const pkg = require(packageJsonPath);
        pkg.name = projectName;

        fs.writeFileSync(
          path.resolve(projectName, "package.json"),
          // 格式化 package.json 内容
          prettier.format(JSON.stringify(pkg), {
            parser: "json",
          })
        );
      } catch (error) {
        console.log(chalk.red("❌重写package.json失败"));
      }

      const isInstall = await inquirer.confirm({
        message: "需要自动安装依赖吗？",
      });
      try {
        if (isInstall) {
          console.log(chalk.yellow(`🚚开始安装依赖`));
          await execa("pnpm", ["i"], {
            cwd: projectName, // 指定工作目录
            stdio: "inherit", // 将子进程的输入输出与父进程共享
          });
          console.log(chalk.green(`✅安装完成`));
        }
      } catch (error) {
        console.log(chalk.redBright(`❌安装失败`), error);
      }

      process.exit(process.exitCode);
    });

  program.parse();
}
