import { ActiveFile } from "../vscode_utils";

export interface IOpener {

  computePathLocal(file:ActiveFile): string;

  openFile(file:ActiveFile): void;

  openFileInVerticalSplit(file:ActiveFile): void;

}