import { ProjectionElixir } from "../projections/elixir";
import { ProjectionRuby } from "../projections/ruby";
import { ProjectionTypescript } from "../projections/typescript";
import { ISettings } from "../settings/ISettings";
import { SettingsRuby } from "../settings/ruby";
import { SettingsTypescript } from "../settings/typescript";
import { ActiveFile, displayErrorMessage } from "../vscode_utils";
import { OpenerElixir } from "./elixir";
import { IOpener } from "./IOpener";
import { OpenerRuby } from "./ruby";
import { OpenerTypeScript } from "./typescript";

export function chooseOpener(file: ActiveFile): IOpener | undefined {
  let opener: IOpener | undefined;
  let settings: ISettings;
  switch (file.language) {
    case "ruby":
      settings = new SettingsRuby();
      opener = new OpenerRuby(settings, new ProjectionRuby(settings));
      break;
    case "elixir":
      settings = new SettingsRuby();
      opener = new OpenerElixir(settings, new ProjectionElixir(settings));
      break;
    case "typescript":
      settings = new SettingsTypescript();
      opener = new OpenerTypeScript(settings, new ProjectionTypescript(settings));
      break;
    default:
      displayErrorMessage(
        `${file.language} is unsupported by vscode-test.`
      );
      break;
  }
  return opener;
}
