import { ActiveFile } from "../vscode_utils";
import { SettingsRuby } from "../settings/ruby";
import { RunnerRuby } from "./ruby";
import { ISettings } from "../settings/ISettings";
import { IProjection } from "../projections/IProjection";
import { ProjectionRuby } from "../projections/ruby";
import { RunnerTypescript } from "./typescript";

const settings: ISettings = new SettingsRuby();
const projection: IProjection = new ProjectionRuby(settings);

describe("typescriptCommandGenerator", () => {
  test("generates a command for the corresponding test for a file in lib", () => {
    const file: ActiveFile = {
      fileName: "src/file/account.ts",
      language: "typescript",
      lineNumber: 0,
      workspaceRoot: "~/dev/dwarfcode",
      relativePath: "src/file/account.ts",
    };

    const command = new RunnerRuby(projection).commandGenerator(file, "file");

    expect(command)
      .toEqual("npx mocha -r ./node_modules/ts-node/register -S --exit test/src/file/account.test.ts");
  });

  test("Check function name regex", () => {
    const testCases: [string,string][] = [
      [ "public static shouldLog(currentLog:string): string {" , "shouldLog"],
      [ "function testMe() { }", "testMe"],
      [ "private static x(a)", "x" ]
    ];

    testCases.forEach(([testString, expected]) => {
      expect(RunnerTypescript.guessTsMethodName(testString)).toEqual(expected);
    });
  });
});
