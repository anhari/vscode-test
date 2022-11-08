import { ActiveFile } from "../vscode_utils";
import { SettingsRuby } from "../settings/ruby";
import { RunnerRuby } from "./ruby";
import { ISettings } from "../settings/ISettings";
import { IProjection } from "../projections/IProjection";
import { ProjectionRuby } from "../projections/ruby";

const settings: ISettings = new SettingsRuby();
const projection: IProjection = new ProjectionRuby(settings);

describe("rubyCommandGenerator", () => {
  test("generates a command for the corresponding test for a file in lib", () => {
    const file: ActiveFile = {
      fileName: "lib/dwarfcode/account.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "lib/dwarfcode/account.rb",
    };

    const command = new RunnerRuby(projection).commandGenerator(file, "file");

    expect(command)
      .toEqual("bin/rails test test/lib/dwarfcode/account_test.rb");
  });

  test("generates a command for the corresponding test for a file in app", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 8,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    const command = new RunnerRuby(projection).commandGenerator(file, "file");

    expect(command)
      .toEqual("bin/rails test test/models/user_test.rb");
  });

  test("generates a command for the corresponding test for a given line number", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 8,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    const command = new RunnerRuby(projection).commandGenerator(file, "line");

    expect(command)
      .toEqual("bin/rails test test/models/user_test.rb:8");
  });

  describe("rspec", () => {
    beforeEach(() => {
      let settingsRuby: ISettings = {
        testCommand: "bin/rspec",
        testDirectory: "spec",
        testDirectoryLocal: "spec",
        testPattern: "_spec.rb",
      };
    });

    test("generates a command for the corresponding test for a file in lib", () => {
      const file: ActiveFile = {
        fileName: "lib/dwarfcode/account.rb",
        language: "ruby",
        lineNumber: 0,
        workspaceRoot: "~/dev/dwarfcode",
        relativePath: "lib/dwarfcode/account.rb",
      };

      const command = new RunnerRuby(projection).commandGenerator(file, "file");

      expect(command).toEqual("bin/rspec spec/lib/dwarfcode/account_spec.rb");
    });

    test("generates a command for the corresponding test for a file in app", () => {
      const file: ActiveFile = {
        fileName: "app/models/user.rb",
        language: "ruby",
        lineNumber: 8,
        workspaceRoot: "~/dev/dwarfcode",
        relativePath: "app/models/user.rb",
      };

      const command = new RunnerRuby(projection).commandGenerator(file, "file");

      expect(command).toEqual("bin/rspec spec/models/user_spec.rb");
    });

    test("generates a command for the corresponding test for a given line number", () => {
      const file: ActiveFile = {
        fileName: "app/models/user.rb",
        language: "ruby",
        lineNumber: 8,
        workspaceRoot: "~/dev/dwarfcode",
        relativePath: "app/models/user.rb",
      };

      const command = new RunnerRuby(projection).commandGenerator(file, "line");

      expect(command).toEqual("bin/rspec spec/models/user_spec.rb:8");
    });
  });
});
