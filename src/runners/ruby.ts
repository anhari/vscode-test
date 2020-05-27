import {
  ActiveFile,
  executeTestCommand,
  getConfiguration,
  getSetting,
} from "../vscode_utils";
import { fileOrLineCommand } from "./utils";
import { getRubySettings } from "../settings/ruby";
import { computeRubyTestPath } from "../projections/ruby";

const rubyCommandGenerator = (
  file: ActiveFile,
  scope: "file" | "line"
): string => {
  const { rubyTestCommand } = getRubySettings();
  const testPath = computeRubyTestPath(file);
  return `${rubyTestCommand} ${fileOrLineCommand(testPath, file, scope)}`;
};

const rubyTestRunner = (file: ActiveFile, scope: "file" | "line"): void => {
  executeTestCommand(rubyCommandGenerator(file, scope), file.activeTextEditor);
};

export { rubyCommandGenerator, rubyTestRunner };
