import { ActiveFile, getConfigurationSetting, openFile } from "../vscode_utils";

const computePath = (relativePath: string, workspaceRoot: string) => {
  let path: string;

  const elixirTestDirectory =
    getConfigurationSetting("elixirTestDirectory") || "test";
  const elixirTestPattern =
    getConfigurationSetting("elixirTestPattern") || "_test.exs";

  if (relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    path = relativePath.replace(elixirTestDirectory, "lib");
    if (path.match(RegExp(elixirTestPattern))) {
      path = path.replace(elixirTestPattern, ".ex");
    }
  } else {
    path = relativePath.replace(/^[^\/]*/, elixirTestDirectory);
    if (!path.match(RegExp(elixirTestPattern))) {
      path = path.replace(".ex", elixirTestPattern);
    }
  }

  return path;
};

const elixirFileOpener = (file: ActiveFile) => {
  if (file.workspaceRoot) {
    openFile(
      `${file.workspaceRoot}/${computePath(
        file.relativePath,
        file.workspaceRoot
      )}`
    );
  }
};

export { elixirFileOpener };
