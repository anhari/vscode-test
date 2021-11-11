import { ActiveFile, openFile, openFileInVerticalSplit } from "../vscode_utils";
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

const openRubyFile = (file: ActiveFile) => {
  if (file.workspaceRoot) {
    openFile(`${file.workspaceRoot}/${computeRubyPath(file)}`);
  }
};

const openRubyFileInVerticalSplit = (file: ActiveFile) => {
  if (file.workspaceRoot) {
    openFileInVerticalSplit(`${file.workspaceRoot}/${computeRubyPath(file)}`);
  }
};

export { computeRubyPath, openRubyFile, openRubyFileInVerticalSplit };
