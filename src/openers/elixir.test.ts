import { computeElixirPath } from "./elixir";
import { ActiveFile } from "../vscode_utils";

describe("computeElixirPath", () => {
  it("opens the test file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/accounts.ex",
      language: "elixir",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/accounts.ex",
    };

    expect(computeElixirPath(file)).toEqual("test/dwarfcode/accounts_test.exs");
  });

  it("opens the test file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "test/dwarfcode/accounts_test.exs",
      language: "elixir",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "test/dwarfcode/accounts_test.exs",
    };

    expect(computeElixirPath(file)).toEqual("lib/dwarfcode/accounts.ex");
  });
});
