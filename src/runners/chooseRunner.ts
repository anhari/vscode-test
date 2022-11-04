import { ProjectionElixir } from "../projections/elixir";
import { IProjection } from "../projections/IProjection";
import { ProjectionRuby } from "../projections/ruby";
import { ProjectionTypescript } from "../projections/typescript";
import { SettingsElixir } from "../settings/elixir";
import { SettingsRuby } from "../settings/ruby";
import { SettingsTypescript } from "../settings/typescript";
import { ActiveFile, displayErrorMessage } from "../vscode_utils";
import { RunnerElixir } from "./elixir";
import { IRunner } from "./IRunner";
import { RunnerRuby } from "./ruby";
import { RunnerTypescript } from "./typescript";

export function chooseRunner(file: ActiveFile): IRunner | undefined {
  let runner: IRunner | undefined;
  console.log(file);
  switch (file.language) {
    case "ruby":
      runner = new RunnerRuby(new ProjectionRuby(new SettingsRuby()));
      break;
    case "elixir":
      runner = new RunnerElixir(new ProjectionElixir(new SettingsElixir()));
      break;
    case "typescript":
      runner = new RunnerTypescript(new ProjectionTypescript(new SettingsTypescript()));
      console.log({runner});
      break;
    default:
      displayErrorMessage(
        `${file.language} is unsupported by vscode-test.`
      );
      break;
  }
  return runner;
}
