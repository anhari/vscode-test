import { elixirCommandGenerator } from "./elixir";
import { ActiveFile } from "../vscode_utils";

describe("elixirCommandGenerator", () => {
  test("generates a command for the corresponding test for a file in lib", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/accounts.ex",
      language: "elixir",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/accounts.ex",
    };

    const command = elixirCommandGenerator(file, "file");

    expect(command).toEqual("mix test test/dwarfcode/accounts_test.exs");
  });

  test("generates a command for the corresponding test for a given line number", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/accounts.ex",
      language: "elixir",
      lineNumber: 8,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/accounts.ex",
    };

    const command = elixirCommandGenerator(file, "line");

    expect(command).toEqual("mix test test/dwarfcode/accounts_test.exs:8");
  });
});
