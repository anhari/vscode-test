import { getConfiguration, getSetting } from "../vscode_utils";

type ElixirSettings = {
  elixirTestCommand: string;
  elixirTestDirectory: string;
  elixirTestPattern: string;
};

const getElixirSettings = (): ElixirSettings => {
  const config = getConfiguration();

  return {
    elixirTestCommand: getSetting(config, "elixirTestCommand") || "mix test",
    elixirTestDirectory: getSetting(config, "elixirTestDirectory") || "test",
    elixirTestPattern: getSetting(config, "elixirTestPattern") || "_test.exs",
  };
};

export { getElixirSettings, ElixirSettings };
