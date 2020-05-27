import { computeRubyPath } from "./ruby";
import { ActiveFile } from "../vscode_utils";
import * as RubySettings from "../settings/ruby";

describe("computeRubyPath", () => {
  it("opens the test file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    expect(computeRubyPath(file)).toEqual("test/models/user_test.rb");
  });

  it("opens the source file when viewing the test", () => {
    const file: ActiveFile = {
      fileName: "test/models/user_test.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "test/models/user_test.rb",
    };

    expect(computeRubyPath(file)).toEqual("app/models/user.rb");
  });

  describe("rspec", () => {
    beforeEach(() => {
      jest.spyOn(RubySettings, "getRubySettings").mockImplementation(() => ({
        rubyTestCommand: "bin/rspec",
        rubyTestDirectory: "spec",
        rubyTestPattern: "_spec.rb",
      }));
    });
    it("opens the spec file when viewing the source", () => {
      const file: ActiveFile = {
        fileName: "app/models/user.rb",
        language: "ruby",
        lineNumber: 0,
        workspaceRoot: "~/dev/dwarfcode",
        relativePath: "app/models/user.rb",
      };

      expect(computeRubyPath(file)).toEqual("spec/models/user_spec.rb");
    });

    it("opens the source file when viewing the test", () => {
      const file: ActiveFile = {
        fileName: "spec/models/user_spec.rb",
        language: "ruby",
        lineNumber: 0,
        workspaceRoot: "~/dev/dwarfcode",
        relativePath: "spec/models/user_spec.rb",
      };

      expect(computeRubyPath(file)).toEqual("app/models/user.rb");
    });
  });
});
