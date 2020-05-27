import { getConfiguration, getSetting } from "../vscode_utils";

type RubySettings = {
  rubyTestCommand: string;
  rubyTestDirectory: string;
  rubyTestPattern: string;
};

const getRubySettings = (): RubySettings => {
  const config = getConfiguration();

  return {
    rubyTestCommand: getSetting(config, "rubyTestCommand") || "bin/rails test",
    rubyTestDirectory: getSetting(config, "rubyTestDirectory") || "test",
    rubyTestPattern: getSetting(config, "rubyTestPattern") || "_test.rb",
  };
};

export { getRubySettings, RubySettings };
