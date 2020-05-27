import {
  ActiveFile,
  executeTestCommand,
  getConfiguration,
  getSetting,
} from "../vscode_utils";

interface RubySettings {
  rubyTestCommand: string;
  rubyTestDirectory: string;
  rubyTestPattern: string;
}

const config = getConfiguration();

const rubySettings: RubySettings = {
  rubyTestCommand: getSetting(config, "rubyTestCommand") || "bin/rails test",
  rubyTestDirectory: getSetting(config, "rubyTestDirectory") || "test",
  rubyTestPattern: getSetting(config, "rubyTestPattern") || "_test.rb",
};

const rubyCommandGenerator = (
  file: ActiveFile,
  scope: "file" | "line"
): string => {
  let command: string;
  let path: string;
  const { rubyTestCommand, rubyTestDirectory, rubyTestPattern } = rubySettings;
  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}`))) {
    path = file.relativePath;
  } else {
    if (file.relativePath.match(/^lib/)) {
      path = `${rubyTestDirectory}/${file.relativePath}`;
    } else {
      path = file.relativePath.replace(/^[^\/]*/, rubyTestDirectory);
    }
    path = path.replace(".rb", rubyTestPattern);
  }

  if (scope === "line") {
    command = `${path}:${file.lineNumber}`;
  } else {
    command = `${path}`;
  }
  return `${rubyTestCommand} ${command}`;
};

const rubyTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  executeTestCommand(rubyCommandGenerator(file, scope), file.activeTextEditor);
};

export { rubyCommandGenerator, rubyTestRunner };
