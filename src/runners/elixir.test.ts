import { ProjectionElixir } from "../projections/elixir";
import { IProjection } from "../projections/IProjection";
import { SettingsElixir } from "../settings/elixir";
import { ISettings } from "../settings/ISettings";
import { ActiveFile } from "../vscode_utils";
import { RunnerElixir } from "./elixir";


const settings: ISettings = new SettingsElixir();
const projection: IProjection = new ProjectionElixir(settings);

describe("elixirCommandGenerator", () => {
  test("generates a command for the corresponding test for a file in lib", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/accounts.ex",
      language: "elixir",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/accounts.ex",
    };

    const command = new RunnerElixir(projection).commandGenerator(file, "file");

    expect(command)
      .toEqual("mix test test/dwarfcode/accounts_test.exs");
  });

  test("generates a command for the corresponding test for a given line number", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/accounts.ex",
      language: "elixir",
      lineNumber: 8,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/accounts.ex",
    };

    const command = new RunnerElixir(projection).commandGenerator(file, "line");

    expect(command)
      .toEqual("mix test test/dwarfcode/accounts_test.exs:8");
  });
});
