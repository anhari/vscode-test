import { getConfiguration, getSetting } from "../vscode_utils";
import { ISettings } from "./ISettings";

export class SettingsElixir implements ISettings {
  public testCommand: string;

  public testDirectory: string;

  public testPattern: string;

  public testDirectoryLocal: string;

  constructor() {
    const config = getConfiguration();

    this.testCommand = getSetting(config, "elixirTestCommand") 
      || "mix test";
    this.testDirectory = getSetting(config, "elixirTestDirectory")
       || "test";
    this.testDirectoryLocal = getSetting(config, "elixirTestDirectoryLocal")
      || this.testDirectory;
    this.testPattern = getSetting(config, "elixirTestPattern") 
      || "_test.exs";
  }

}
