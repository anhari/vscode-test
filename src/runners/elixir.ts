import {
  ActiveFile,
  executeTestCommand,
  getConfiguration,
  getSetting,
} from "../vscode_utils";

interface ElixirSettings {
  elixirTestCommand: string;
  elixirTestDirectory: string;
  elixirTestPattern: string;
}

const config = getConfiguration();

const elixirSettings: ElixirSettings = {
  elixirTestCommand: getSetting(config, "elixirTestCommand") || "mix test",
  elixirTestDirectory: getSetting(config, "elixirTestDirectory") || "test",
  elixirTestPattern: getSetting(config, "elixirTestPattern") || "_test.exs",
};

const elixirCommandGenerator = (
  file: ActiveFile,
  scope: "file" | "line"
): string => {
  let command: string;
  let path: string;
  const {
    elixirTestCommand,
    elixirTestDirectory,
    elixirTestPattern,
  } = elixirSettings;

  if (file.relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    path = file.relativePath;
  } else {
    path = file.relativePath
      .replace(/^[^\/]*/, elixirTestDirectory)
      .replace(".ex", elixirTestPattern);
  }

  if (scope === "line") {
    command = `${path}:${file.lineNumber}`;
  } else {
    command = `${path}`;
  }

  return `${elixirTestCommand} ${command}`;
};

const elixirTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  executeTestCommand(
    elixirCommandGenerator(file, scope),
    file.activeTextEditor
  );
};

export { elixirCommandGenerator, elixirTestRunner };
