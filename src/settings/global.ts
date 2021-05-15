import { getConfiguration, getBooleanSetting } from "../vscode_utils";

type GlobalSettings = {
  maximizeTerminal: boolean;
};

const getGlobalSettings = (): GlobalSettings => {
  const config = getConfiguration();

  return {
    maximizeTerminal: getBooleanSetting(config, "maximizeTerminal") || false,
  };
};

export { getGlobalSettings, GlobalSettings };
