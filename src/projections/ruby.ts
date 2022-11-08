import { ActiveFile } from "../vscode_utils";
import { IProjection } from "./IProjection";
import { ISettings } from "../settings/ISettings";

export class ProjectionRuby implements IProjection {
  constructor(
    public settings: ISettings,
  ) { }

  public computeTestPathLocal(file: ActiveFile): string {
    const { testDirectory } = this.settings;

    if (file.relativePath.match(RegExp(`^${testDirectory}`))) {
      return file.relativePath;
    } else {
      return this.pathForTestFileLocal(file);
    }
  }

  public computeTestPath(file: ActiveFile): string {
    const { testDirectory } = this.settings;

    if (file.relativePath.match(RegExp(`^${testDirectory}`))) {
      return file.relativePath;
    } else {
      return this.pathForTestFileLocal(file);
    }
  }
  
  public pathForTestFileLocal(file: ActiveFile): string {
    let path: string;
    const { testDirectoryLocal, testPattern } = this.settings;
  
    if (file.relativePath.match(/^lib/)) {
      path = `${testDirectoryLocal}/${file.relativePath}`;
    } else {
      path = file.relativePath.replace(/^[^\/]*/, testDirectoryLocal);
    }
  
    return path.replace(".rb", testPattern);
  }
  
  pathForTestFile(file: ActiveFile): string {
    let path: string;
    const { testDirectory, testPattern } = this.settings;
  
    if (file.relativePath.match(/^lib/)) {
      path = `${testDirectory}/${file.relativePath}`;
    } else {
      path = file.relativePath.replace(/^[^\/]*/, testDirectory);
    }
  
    return path.replace(".rb", testPattern);
  }
  
  public pathForSourceFile(file: ActiveFile): string {
    let path: string;
    const { testDirectory, testPattern } = this.settings;

    if (file.relativePath.match(RegExp(`^${testDirectory}\/lib`))) {
      path = file.relativePath.replace(/^[^\/]*/, "");
    } else {
      path = file.relativePath.replace(/^[^\/]*/, "app");
    }

    path = path.replace(testPattern, ".rb");
    return path;
  }

}