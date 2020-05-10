import {
  ActiveFile,
  executeTestCommand,
  getConfigurationSetting,
} from "../vscode_utils";

const elixirTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  let command: string;
  let path: string;

  const elixirTestCommand =
    getConfigurationSetting("elixirTestCommand") || "mix test";
  const elixirTestDirectory =
    getConfigurationSetting("elixirTestDirectory") || "test";
  const elixirTestPattern =
    getConfigurationSetting("elixirTestPattern") || "_test.exs";

  if (file.relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    path = file.relativePath;
  } else {
    path = file.relativePath.replace(/^[^\/]*/, elixirTestDirectory);
    if (!path.match(RegExp(elixirTestPattern))) {
      path = path.replace(".ex", elixirTestPattern);
    }
  }

  if (scope === "line") {
    command = `${path}:${file.lineNumber}`;
  } else {
    command = `${path}`;
  }

  executeTestCommand(`${elixirTestCommand} ${command}`, file.activeTextEditor);
};

export { elixirTestRunner };
