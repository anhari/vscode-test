import { ProjectionRuby } from "../projections/ruby";
import { SettingsRuby } from "../settings/ruby";
import { ActiveFile } from "../vscode_utils";
import { OpenerRuby } from "./ruby";

const settings = new SettingsRuby();
const projection = new ProjectionRuby(settings);

describe("computeRubyPath", () => {
  it("opens the test file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    expect(new OpenerRuby(settings, projection).computePathLocal(file))
      .toEqual("test/models/user_test.rb");
  });

  it("opens the source file when viewing the test", () => {
    const file: ActiveFile = {
      fileName: "test/models/user_test.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "test/models/user_test.rb",
    };

    expect(new OpenerRuby(settings, projection).computePathLocal(file))
      .toEqual("app/models/user.rb");
  });
});

describe("rspec", () => {
  it("opens the spec file when viewing the source", () => {
    const file: ActiveFile = {
      fileName: "app/models/user.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "app/models/user.rb",
    };

    expect(new OpenerRuby(settings, projection).computePathLocal(file))
      .toEqual("spec/models/user_spec.rb");
  });

  it("opens the source file when viewing the test", () => {
    const file: ActiveFile = {
      fileName: "spec/models/user_spec.rb",
      language: "ruby",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "spec/models/user_spec.rb",
    };

    expect(new OpenerRuby(settings, projection).computePathLocal(file))
      .toEqual("app/models/user.rb");
  });
});