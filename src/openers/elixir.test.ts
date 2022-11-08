import { ProjectionElixir } from "../projections/elixir";
import { SettingsElixir } from "../settings/elixir";
import { ActiveFile } from "../vscode_utils";
import { OpenerElixir } from "./elixir";


const settings = new SettingsElixir();
const projection = new ProjectionElixir(settings);

describe("computeElixirPath", () => {
  it("opens the test file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/accounts.ex",
      language: "elixir",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/accounts.ex",
    };

    expect(new OpenerElixir(settings, projection).computePathLocal(file))
      .toEqual("test/dwarfcode/accounts_test.exs");
  });

  it("opens the test file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "test/dwarfcode/accounts_test.exs",
      language: "elixir",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "test/dwarfcode/accounts_test.exs",
    };

    expect(new OpenerElixir(settings, projection).computePathLocal(file))
      .toEqual("lib/dwarfcode/accounts.ex");
  });
});
