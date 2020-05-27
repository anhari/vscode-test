import { ActiveFile } from "../vscode_utils";
import { getElixirSettings } from "../settings/elixir";

const pathForElixirTestFile = (file: ActiveFile): string => {
  const { elixirTestDirectory, elixirTestPattern } = getElixirSettings();
  return file.relativePath
    .replace(/^[^\/]*/, elixirTestDirectory)
    .replace(".ex", elixirTestPattern);
};

const pathForElixirSourceFile = (file: ActiveFile): string => {
  const { elixirTestDirectory, elixirTestPattern } = getElixirSettings();
  return file.relativePath
    .replace(elixirTestDirectory, "lib")
    .replace(elixirTestPattern, ".ex");
};

const computeElixirTestPath = (file: ActiveFile) => {
  const { elixirTestDirectory } = getElixirSettings();

  if (file.relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    return file.relativePath;
  } else {
    return pathForElixirTestFile(file);
  }
};

export {
  computeElixirTestPath,
  pathForElixirTestFile,
  pathForElixirSourceFile,
};
