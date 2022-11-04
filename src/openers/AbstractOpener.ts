import { IProjection } from "../projections/IProjection";
import { ISettings } from "../settings/ISettings";
import { ActiveFile, openFile, openFileInVerticalSplit } from "../vscode_utils";
import { IOpener } from "./IOpener";

export abstract class AbstractOpener implements IOpener {

  
  constructor(
    private settings: ISettings,
    private projection: IProjection,
  ) { }

  public computePathLocal(file: ActiveFile): string {
    const { testDirectoryLocal } = this.settings;
    console.log({testDirectoryLocal});
    if (file.relativePath.match(RegExp(`^${testDirectoryLocal}`))) {
      return this.projection.pathForSourceFile(file);
    } else {
      return this.projection.pathForTestFileLocal(file);
    }
  }

  public computePath(file: ActiveFile): string {
    const { testDirectory } = this.settings;
    console.log({testDirectory});
    if (file.relativePath.match(RegExp(`^${testDirectory}`))) {
      return this.projection.pathForSourceFile(file);
    } else {
      return this.projection.pathForTestFileLocal(file);
    }
  }

  public openFile(file: ActiveFile): void {
    if (file.workspaceRoot) {
      openFile(`${file.workspaceRoot}/${this.computePathLocal(file)}`);
    }
  }
  
  public openFileInVerticalSplit(file: ActiveFile): void {
    if (file.workspaceRoot) {
      openFileInVerticalSplit(`${file.workspaceRoot}/${this.computePathLocal(file)}`);
    }
  }

}