import { ActiveFile, executeTestCommand } from "../vscode_utils";
import { fileOrLineCommand } from "./utils";
import { SettingsElixir } from "../settings/elixir";
import { IRunner } from "./IRunner";
import { IProjection } from "../projections/IProjection";


export class RunnerElixir implements IRunner {

  constructor(
    private projection: IProjection,
  ) {}

  public commandGenerator (
    file: ActiveFile,
    scope: "file" | "line"
  ): string {
    const { testCommand } = new SettingsElixir();
    const testPath = this.projection.computeTestPath(file);
    return `${testCommand} ${fileOrLineCommand(testPath, file, scope)}`;
  }

  public testRunner (
    file: ActiveFile,
    scope: "file" | "line"
  ): void  {
    executeTestCommand(
      this.commandGenerator(file, scope),
      file.activeTextEditor
    );
  }

}