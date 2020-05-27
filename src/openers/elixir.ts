import { ActiveFile, openFile } from "../vscode_utils";
import { getElixirSettings } from "../settings/elixir";
import {
  pathForElixirSourceFile,
  pathForElixirTestFile,
} from "../projections/elixir";

const computeElixirPath = (file: ActiveFile): string => {
  let path: string;
  const { elixirTestDirectory } = getElixirSettings();

  if (file.relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    path = pathForElixirSourceFile(file);
  } else {
    path = pathForElixirTestFile(file);
  }
  return path;
};

const elixirFileOpener = (file: ActiveFile) => {
  if (file.workspaceRoot) {
    openFile(`${file.workspaceRoot}/${computeElixirPath(file)}`);
  }
};

export { computeElixirPath, elixirFileOpener };
