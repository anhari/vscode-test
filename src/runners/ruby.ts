import {
  ActiveFile,
  executeTestCommand,
  getConfigurationSetting,
} from "../vscode_utils";

const rubyTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  let command: string;
  if (scope === "line") {
    command = `${file.relativePath}:${file.lineNumber}`;
  } else {
    command = `${file.relativePath}`;
  }

  const userDefinedTestCommand = getConfigurationSetting("rubyTestCommand");

  if (userDefinedTestCommand) {
    return executeTestCommand(
      `${userDefinedTestCommand} ${command}`,
      file.activeTextEditor
    );
  }

  if (file.fileName.match(/_spec.rb$/)) {
    executeTestCommand(`bin/rspec ${command}`, file.activeTextEditor);
  } else {
    executeTestCommand(`bin/rails test ${command}`, file.activeTextEditor);
  }
};

export { rubyTestRunner };
