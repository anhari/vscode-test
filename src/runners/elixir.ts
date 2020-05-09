import { ActiveFile, executeTestCommand } from "../vscode_utils";

const elixirTestRunner = (file: ActiveFile, scope: "file" | "line") => {
  let command: string;
  if (scope === "line") {
    command = `${file.relativePath}:${file.lineNumber}`;
  } else {
    command = `${file.relativePath}`;
  }

  executeTestCommand(`mix test ${command}`, file.activeTextEditor);
};

export { elixirTestRunner };
