import { getConfiguration, getSetting } from "../vscode_utils";
import { ISettings } from "./ISettings";

export class SettingsRuby implements ISettings {
  public testCommand: string;

  public testDirectory: string;

  public testDirectoryLocal: string;
  
  public testPattern: string;
  
  constructor() {
    const config = getConfiguration();

    this.testCommand = getSetting(config, "rubyTestCommand") 
      || "bin/rails test";
    this.testDirectory = getSetting(config, "rubyTestDirectory") 
      || "test";
    this.testDirectoryLocal = getSetting(config, "rubyTestDirectoryLocal")
      || this.testDirectory;
    this.testPattern = getSetting(config, "rubyTestPattern") 
      || "_test.rb";
  }
}