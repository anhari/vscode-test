import { rubyCommandGenerator } from "./ruby";
import { ActiveFile } from "../vscode_utils";

describe("rubyCommandGenerator", () => {
  test("generates a command for the corresponding test for a file in lib", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/account.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/account.rb",
    };

    const command = rubyCommandGenerator(file, "file");

    expect(command).toEqual(
      "bin/rails test test/lib/dwarfcode/account_test.rb"
    );
  });

  test("generates a command for the corresponding test for a file in app", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 8,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    const command = rubyCommandGenerator(file, "line");

    expect(command).toEqual("bin/rails test test/models/user_test.rb:8");
  });

  test("generates a command for the corresponding test for a given line number", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 8,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    const command = rubyCommandGenerator(file, "line");

    expect(command).toEqual("bin/rails test test/models/user_test.rb:8");
  });
});
