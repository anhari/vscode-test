import { ActiveFile } from "../vscode_utils";

export interface IProjection {

  computeTestPath(file:ActiveFile): string;
  
  computeTestPathLocal(file:ActiveFile): string;

  pathForTestFileLocal(file:ActiveFile): string;

  pathForTestFile(file:ActiveFile): string;

  pathForSourceFile(file:ActiveFile): string;

}