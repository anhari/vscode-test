import { ActiveFile, openFile } from "../vscode_utils";
import { getRubySettings } from "../settings/ruby";
import {
  pathForRubySourceFile,
  pathForRubyTestFile,
} from "../projections/ruby";

const rubyFileOpener = (file: ActiveFile) => {
  let path: string;
  const { rubyTestDirectory } = getRubySettings();

  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}`))) {
    path = pathForRubySourceFile(file);
  } else {
    path = pathForRubyTestFile(file);
  }

  if (file.workspaceRoot) {
    openFile(`${file.workspaceRoot}/${path}`);
  }
};

export { rubyFileOpener };
