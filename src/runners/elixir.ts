import {
  ActiveFile,
  executeTestCommand,
  getConfigurationSetting,
} from "../vscode_utils";

const elixirTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  let command: string;
  let path: string;

  if (file.relativePath.match(/^test\//)) {
    path = file.relativePath;
  } else {
    path = file.relativePath.replace(/^[^\/]+/, "test");
  }

  if (scope === "line") {
    command = `${file.relativePath}:${file.lineNumber}`;
  } else {
    command = `${file.relativePath}`;
  }

  const userDefinedTestCommand = getConfigurationSetting("elixirTestCommand");

  if (userDefinedTestCommand) {
    return executeTestCommand(
      `${userDefinedTestCommand} ${command}`,
      file.activeTextEditor
    );
  }

  executeTestCommand(`mix test ${command}`, file.activeTextEditor);
};

export { elixirTestRunner };
