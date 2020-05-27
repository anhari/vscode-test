import { ActiveFile } from "../vscode_utils";

const fileOrLineCommand = (path: string, file: ActiveFile, scope: string) => {
  if (scope === "line") {
    return `${path}:${file.lineNumber}`;
  } else {
    return `${path}`;
  }
};

export { fileOrLineCommand };
