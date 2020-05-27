import { ActiveFile, executeTestCommand } from "../vscode_utils";
import { computeElixirTestPath } from "../projections/elixir";
import { fileOrLineCommand } from "./utils";
import { getElixirSettings } from "../settings/elixir";

const elixirCommandGenerator = (
  file: ActiveFile,
  scope: "file" | "line"
): string => {
  const { elixirTestCommand } = getElixirSettings();
  const testPath = computeElixirTestPath(file);
  return `${elixirTestCommand} ${fileOrLineCommand(testPath, file, scope)}`;
};

const elixirTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  executeTestCommand(
    elixirCommandGenerator(file, scope),
    file.activeTextEditor
  );
};

export { elixirCommandGenerator, elixirTestRunner };
