import { ActiveFile, getConfigurationSetting, openFile } from "../vscode_utils";

const elixirFileOpener = (file: ActiveFile) => {
  let path: string;

  const elixirTestDirectory =
    getConfigurationSetting("elixirTestDirectory") || "test";
  const elixirTestPattern =
    getConfigurationSetting("elixirTestPattern") || "_test.exs";

  if (file.relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    path = file.relativePath.replace(elixirTestDirectory, "lib");
    if (path.match(RegExp(elixirTestPattern))) {
      path = path.replace(elixirTestPattern, ".ex");
    }
  } else {
    path = file.relativePath.replace(/^[^\/]*/, elixirTestDirectory);
    if (!path.match(RegExp(elixirTestPattern))) {
      path = path.replace(".ex", elixirTestPattern);
    }
  }

  openFile(`${file.workspaceRoot}/${path}`);
};

export { elixirFileOpener };
