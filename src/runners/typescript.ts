import { ActiveFile, displayErrorMessage, executeTestCommand } from "../vscode_utils";
import { fileOrLineCommand } from "./utils";
import { IRunner } from "./IRunner";
import { IProjection } from "../projections/IProjection";
import { SettingsTypescript } from "../settings/typescript";
import path = require("path");
import * as vscode from 'vscode';

export class RunnerTypescript implements IRunner {
  constructor(
    private projection: IProjection,
  ) {}

  public commandGenerator (
    file: ActiveFile,
    scope: "file" | "line"
  ): string {
    const { testCommand } = new SettingsTypescript();
    const testPath = this.projection.computeTestPath(file);
    const fileCommand = fileOrLineCommand(testPath, file, 'file');
    if (scope === 'file') {
      return `${testCommand} ${fileCommand}`;
    } else {
      // Get the active text editor
  		const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document: vscode.TextDocument = editor.document;
        const line: string = document.lineAt(file.lineNumber-1).text;
        const methodName = RunnerTypescript.guessTsMethodName(line);
        console.log( {line, methodName});
        return `${testCommand} ${fileCommand} -g "${methodName}()"`;
      } else {
        displayErrorMessage('Error while creating command: cannot read editor');
        return '';
      }
    }
  }

  public testRunner (
    file: ActiveFile,
    scope: "file" | "line"
  ): void  {
    executeTestCommand(
      this.commandGenerator(file, scope),
      file.activeTextEditor
    );
  }

  public static guessTsMethodName(line: string): string | null {
    let str: RegExpMatchArray | null  = line
      .replace(/(public|private|protected) /, "")
      .replace("static ", "")
      .replace("function ", "")
      .trim()
      .match(/^([A-Za-z0-9_]+).*/);
    if (str) {
      return str[1];
    } else {
      return null;
    }
  };
}