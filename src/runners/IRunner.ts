import { ActiveFile } from "../vscode_utils";

export interface IRunner {
  commandGenerator(file:ActiveFile, scope: 'file'|'line'): string;
  
  testRunner(file: ActiveFile, scope: "file" | "line"): void;
}