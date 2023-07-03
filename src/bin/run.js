"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = __importStar(require("@inquirer/prompts"));
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const execa_1 = __importDefault(require("execa"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const prettier_1 = __importDefault(require("prettier"));
const package_json_1 = require("../../package.json");
const giPathMap = {
    ssh: {
        micro: "git@codeup.aliyun.com:6405989456067d3aad3dfc52/FrontEnd/micro-application-template-umi.git",
        master: "git@codeup.aliyun.com:6405989456067d3aad3dfc52/FrontEnd/master-application-template-umi.git",
        Single: "git@codeup.aliyun.com:6405989456067d3aad3dfc52/FrontEnd/single-page-system.git",
        components: "git@codeup.aliyun.com:6405989456067d3aad3dfc52/Components-FrontEnd/huize_react-components.git",
        bpmn: "git@codeup.aliyun.com:6405989456067d3aad3dfc52/FrontEnd/bpmn-test.git",
        sign: "git@codeup.aliyun.com:6405989456067d3aad3dfc52/FrontEnd/online_signing_demo.git",
    },
    https: {
        micro: "https://codeup.aliyun.com/6405989456067d3aad3dfc52/FrontEnd/micro-application-template-umi.git",
        master: "https://codeup.aliyun.com/6405989456067d3aad3dfc52/FrontEnd/master-application-template-umi.git",
        Single: "https://codeup.aliyun.com/6405989456067d3aad3dfc52/FrontEnd/single-page-system.git",
        components: "https://codeup.aliyun.com/6405989456067d3aad3dfc52/Components-FrontEnd/huize_react-components.git",
        bpmn: "https://codeup.aliyun.com/6405989456067d3aad3dfc52/FrontEnd/bpmn-test.git",
        sign: "https://codeup.aliyun.com/6405989456067d3aad3dfc52/FrontEnd/online_signing_demo.git",
    },
};
function run() {
    commander_1.program.name(package_json_1.name).description(package_json_1.description).version(package_json_1.version);
    commander_1.program
        .command("create")
        .description("创建模版项目")
        .argument("[project-name]<string>", "项目名称")
        // .option("-s, --separator <char>", "分隔符", ",")
        .action((projectName) => __awaiter(this, void 0, void 0, function* () {
        if (!projectName) {
            projectName = yield inquirer.input({ message: "请输入你的项目名称?" });
        }
        if (!projectName) {
            commander_1.program.parse();
            return;
        }
        const fileList = yield (0, glob_1.glob)("*");
        if (fileList.includes(projectName)) {
            console.log(chalk_1.default.red("文件已存在，退出!"));
            process.exit(process.exitCode);
        }
        const templateValue = yield inquirer.select({
            message: "请选择需要导入的模版",
            choices: [
                {
                    name: "🚀 主应用模版",
                    value: "master",
                    description: "umi4主应用模版 qiankun引擎 pro-component组件库 @huize/react-components私有库 动态主题 快捷菜单",
                },
                {
                    name: "🎯 微应用模版",
                    value: "micro",
                    description: "umi4微应用模版 qiankun引擎 pro-component组件库 @huize/react-components私有库 动态主题 快捷菜单",
                },
                new inquirer.Separator(),
                {
                    name: "🔧 单应用模版",
                    value: "Single",
                    description: "umi4单应用模版 pro-component组件库 @huize/react-components私有库 动态主题 快捷菜单",
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
                    description: "一个通过bpmnjs实现的流程设计器，使用三方组件实现属性面板",
                },
                new inquirer.Separator(),
                {
                    name: "📝 小程序线上签约demo",
                    value: "sign",
                    description: "一个实现E签宝签约认证流程的业务模拟",
                },
            ],
        });
        const gitTypeValue = yield inquirer.select({
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
            yield (0, execa_1.default)(`git`, [`clone`, gitPath, `--depth=1`, projectName], process.env.TEST
                ? {}
                : {
                    stdout: process.stdout,
                    stderr: process.stderr,
                    stdin: process.stdin,
                });
            console.log(chalk_1.default.green(`✅下载 ${templateValue} 成功`));
        }
        catch (error) {
            console.log(chalk_1.default.redBright(`❌模版下载失败`), error);
        }
        try {
            // 获取项目中的 package.json 文件路径
            const packageJsonPath = path_1.default.resolve(projectName, "package.json");
            // 加载 package.json 文件内容
            const pkg = require(packageJsonPath);
            pkg.name = projectName;
            fs_extra_1.default.writeFileSync(path_1.default.resolve(projectName, "package.json"), 
            // 格式化并排序 package.json 内容
            prettier_1.default.format(JSON.stringify(pkg), {
                parser: "json",
            }));
        }
        catch (error) {
            console.log(chalk_1.default.red("❌重写package.json失败"));
        }
        const isInstall = yield inquirer.confirm({
            message: "需要自动安装依赖吗？",
        });
        try {
            if (isInstall) {
                console.log(chalk_1.default.yellow(`🚚开始安装依赖`));
                yield (0, execa_1.default)("pnpm", ["i"], {
                    cwd: projectName,
                    stdio: "inherit", // 将子进程的输入输出与父进程共享
                });
                console.log(chalk_1.default.green(`✅安装完成`));
            }
        }
        catch (error) {
            console.log(chalk_1.default.redBright(`❌安装失败`), error);
        }
        process.exit(process.exitCode);
    }));
    commander_1.program.parse();
}
exports.default = run;
