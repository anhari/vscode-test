import { ActiveFile, openFile } from "../vscode_utils";
import { getRubySettings } from "../settings/ruby";
import {
  pathForRubySourceFile,
  pathForRubyTestFile,
} from "../projections/ruby";

const computeRubyPath = (file: ActiveFile): string => {
  const { rubyTestDirectory } = getRubySettings();

  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}`))) {
    return pathForRubySourceFile(file);
  } else {
    return pathForRubyTestFile(file);
  }
};

const rubyFileOpener = (file: ActiveFile) => {
  if (file.workspaceRoot) {
    openFile(`${file.workspaceRoot}/${computeRubyPath(file)}`);
  }
};

export { computeRubyPath, rubyFileOpener };
