import { ActiveFile, getConfigurationSetting, openFile } from "../vscode_utils";

const rubyFileOpener = (file: ActiveFile) => {
  let path: string;

  const rubyTestDirectory =
    getConfigurationSetting("rubyTestDirectory") || "test";
  const rubyTestPattern =
    getConfigurationSetting("rubyTestPattern") || "_test.rb";

  if (file.relativePath.match(RegExp(`^${rubyTestDirectory}`))) {
    if (file.relativePath.match(RegExp(`^${rubyTestDirectory}\/lib`))) {
      path = file.relativePath.replace(/^[^\/]*/, "");
    } else {
      path = file.relativePath.replace(/^[^\/]*/, "app");
    }

    if (path.match(RegExp(rubyTestPattern))) {
      path = path.replace(rubyTestPattern, ".rb");
    }
  } else {
    if (file.relativePath.match(/^lib/)) {
      path = `${rubyTestDirectory}/${file.relativePath}`;
    } else {
      path = file.relativePath.replace(/^[^\/]*/, rubyTestDirectory);
    }

    if (!path.match(RegExp(rubyTestPattern))) {
      path = path.replace(".rb", rubyTestPattern);
    }
  }
  openFile(`${file.workspaceRoot}/${path}`);
};

export { rubyFileOpener };
