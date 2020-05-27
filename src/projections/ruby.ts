import { ActiveFile } from "../vscode_utils";
import { getRubySettings } from "../settings/ruby";

const pathForRubyTestFile = (file: ActiveFile): string => {
  let path: string;
  const { rubyTestDirectory, rubyTestPattern } = getRubySettings();

  if (file.relativePath.match(/^lib/)) {
    path = `${rubyTestDirectory}/${file.relativePath}`;
  } else {
    path = file.relativePath.replace(/^[^\/]*/, rubyTestDirectory);
  }

  return path.replace(".rb", rubyTestPattern);
};

const pathForRubySourceFile = (file: ActiveFile): string => {
  let path: string;
  const { rubyTestDirectory, rubyTestPattern } = getRubySettings();

  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}\/lib`))) {
    path = file.relativePath.replace(/^[^\/]*/, "");
  } else {
    path = file.relativePath.replace(/^[^\/]*/, "app");
  }

  path = path.replace(rubyTestPattern, ".rb");
  return path;
};

const computeRubyTestPath = (file: ActiveFile) => {
  const { rubyTestDirectory } = getRubySettings();

  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}`))) {
    return file.relativePath;
  } else {
    return pathForRubyTestFile(file);
  }
};

export { computeRubyTestPath, pathForRubyTestFile, pathForRubySourceFile };
