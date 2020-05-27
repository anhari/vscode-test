import { ActiveFile, openFile } from "../vscode_utils";
import { getElixirSettings } from "../settings/elixir";
import {
  pathForElixirSourceFile,
  pathForElixirTestFile,
} from "../projections/elixir";

const elixirFileOpener = (file: ActiveFile) => {
  let path: string;
  const { elixirTestDirectory } = getElixirSettings();

  if (file.relativePath.match(RegExp(`^${elixirTestDirectory}`))) {
    path = pathForElixirSourceFile(file);
  } else {
    path = pathForElixirTestFile(file);
  }

  if (file.workspaceRoot) {
    openFile(`${file.workspaceRoot}/${path}`);
  }
};

export { elixirFileOpener };
