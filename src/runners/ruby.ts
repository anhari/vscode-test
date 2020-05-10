import {
  ActiveFile,
  executeTestCommand,
  getConfigurationSetting,
} from "../vscode_utils";

const rubyTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  let command: string;
  let path: string;

  const rubyTestCommand =
    getConfigurationSetting("rubyTestCommand") || "bin/rails test";
  const rubyTestDirectory =
    getConfigurationSetting("rubyTestDirectory") || "test";
  const rubyTestPattern =
    getConfigurationSetting("rubyTestPattern") || "_test.rb";

  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}`))) {
    path = file.relativePath;
  } else {
    if (file.relativePath.match(/^lib/)) {
      path = `${rubyTestDirectory}/${file.relativePath}`;
    } else {
      path = file.relativePath.replace(/^[^\/]*/, rubyTestDirectory);
    }
    if (!path.match(RegExp(rubyTestPattern))) {
      path = path.replace(".rb", rubyTestPattern);
    }
  }

  if (scope === "line") {
    command = `${path}:${file.lineNumber}`;
  } else {
    command = `${path}`;
  }

  executeTestCommand(`${rubyTestCommand} ${command}`, file.activeTextEditor);
};

export { rubyTestRunner };
