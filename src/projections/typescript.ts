import { ISettings } from "../settings/ISettings";
import { ActiveFile } from "../vscode_utils";
import { IProjection } from "./IProjection";

export class ProjectionTypescript implements IProjection {

  constructor(
    public settings: ISettings,
  ) { }

  public computeTestPathLocal(file: ActiveFile): string {
    const { testDirectoryLocal } = this.settings;

    if (file.relativePath.match(RegExp(`^${testDirectoryLocal}`))) {
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
      return this.pathForTestFile(file);
    }
  }
  
  public pathForTestFileLocal(file: ActiveFile): string {
    const {  testDirectoryLocal, testPattern } = this.settings;
    return file.relativePath
      .replace(/^[^\/]*/, testDirectoryLocal)
      .replace(".ts", testPattern);
  }

  public pathForTestFile(file: ActiveFile): string {
    const {  testDirectory, testPattern } = this.settings;
    return file.relativePath
      .replace(/^[^\/]*/, testDirectory)
      .replace(".ts", testPattern);
  }

  public pathForSourceFile(file: ActiveFile): string {
    const {  testDirectoryLocal, testPattern } = this.settings;
  return file.relativePath
    .replace(testDirectoryLocal, "src")
    .replace(testPattern, ".ts");
  }

}
