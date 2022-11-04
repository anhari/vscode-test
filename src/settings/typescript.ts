import { getConfiguration, getSetting } from "../vscode_utils";
import { ISettings } from "./ISettings";

export class SettingsTypescript implements ISettings {
  public testCommand: string;

  public testDirectory: string;

  public testDirectoryLocal: string;

  public testPattern: string;
  
  constructor() {
    const config = getConfiguration();

    this.testCommand = getSetting(config, "typescriptTestCommand") 
      || "nyc mocha -r ./node_modules/ts-node/register ";
    this.testDirectory = getSetting(config, "typescriptTestDirectory") 
      || "test";
    this.testDirectoryLocal = getSetting(config, "typescriptTestDirectoryLocal")
      || this.testDirectory;
      console.log({td: this.testDirectory, tdl: this.testDirectoryLocal});
    this.testPattern = getSetting(config, "typescriptTestPattern") 
      || ".test.ts";
  }

}