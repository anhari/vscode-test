import {
  ActiveFile,
  executeTestCommand,
} from "../vscode_utils";
import { fileOrLineCommand } from "./utils";
import { SettingsRuby } from "../settings/ruby";
import { IProjection } from "../projections/IProjection";
import { IRunner } from "./IRunner";

export class RunnerRuby implements IRunner {
  constructor(
    private projection: IProjection,
  ) {}

  public commandGenerator(
    file: ActiveFile,
    scope: "file" | "line"
  ): string {
    const { testCommand } = new SettingsRuby();
    const testPath = this.projection.computeTestPath(file);
    return `${testCommand} ${fileOrLineCommand(testPath, file, scope)}`;
  }

  public testRunner(
    file: ActiveFile, 
    scope: "file" | "line"
  ): void {
    executeTestCommand(this.commandGenerator(file, scope), file.activeTextEditor);
  }
}