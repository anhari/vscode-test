import * as vscode from "vscode";
import {
  activeFile,
  executeTestCommand,
  lastTest,
  getActiveTextEditor,
  displayErrorMessage,
  getConfiguration,
  getSetting,
} from "./vscode_utils";
import { IOpener } from "./openers/IOpener";
import { chooseRunner } from "./runners/chooseRunner";
import { chooseOpener } from "./openers/chooseOpener";

export const activate = (context: vscode.ExtensionContext) => {
  let config = getConfiguration();
  let runAllTests = vscode.commands.registerCommand(
    "vscode-test.runAllTests",
    () => {
      const activeTextEditor = getActiveTextEditor();
      const runAllTestsCommand = getSetting(config, "runAllTestsCommand");
      if (runAllTestsCommand) {
        executeTestCommand(runAllTestsCommand, activeTextEditor);
      } else {
        displayErrorMessage(
          "vscode-test: define a command for running all of your application's tests."
        );
      }
    }
  );

  let runAllUnitTests = vscode.commands.registerCommand(
    "vscode-test.runAllUnitTests",
    () => {
      const activeTextEditor = getActiveTextEditor();
      const runAllUnitTestsCommand = getSetting(
        config,
        "runAllUnitTestsCommand"
      );
      if (runAllUnitTestsCommand) {
        executeTestCommand(runAllUnitTestsCommand, activeTextEditor);
      } else {
        displayErrorMessage(
          "vscode-test: define a command for running all of your application's unit tests."
        );
      }
    }
  );

  let runFileTests = vscode.commands.registerCommand(
    "vscode-test.runFileTests",
    () => {
      const activeTextEditor = getActiveTextEditor();
      if (activeTextEditor) {
        const file = activeFile(activeTextEditor);
        const runner = chooseRunner(file);
        if (runner) {
          runner.testRunner(file, 'file');
        }
      }
    }
  );
  let runLineTests = vscode.commands.registerCommand(
    "vscode-test.runLineTests",
    () => {
      const activeTextEditor = getActiveTextEditor();
      if (activeTextEditor) {
        const file = activeFile(activeTextEditor);
        const runner = chooseRunner(file);
        if (runner) {
          runner.testRunner(file, 'line');
        }
      }
    }
  );

  let runLastTests = vscode.commands.registerCommand(
    "vscode-test.runLastTests",
    () => {
      const activeTextEditor = getActiveTextEditor();
      if (activeTextEditor && lastTest) {
        executeTestCommand(lastTest, activeTextEditor);
      }
    }
  );

  let openAlternateFile = vscode.commands.registerCommand(
    "vscode-test.openAlternateFile",
    () => {
      const activeTextEditor = getActiveTextEditor();
      if (activeTextEditor) {
        let opener: IOpener | undefined = undefined;
        const file = activeFile(activeTextEditor);
          opener = chooseOpener(file);
          if (opener) {
            opener.openFile(file);
          }
        }
      }
    );

  let openAlternateFileInVerticalSplit = vscode.commands.registerCommand(
    "vscode-test.openAlternateFileInVerticalSplit",
    () => {
      const activeTextEditor = getActiveTextEditor();
      if (activeTextEditor) {
        const file = activeFile(activeTextEditor);
        let opener: IOpener | undefined = undefined;
        opener = chooseOpener(file);
          if (opener) {
            opener.openFileInVerticalSplit(file);
          }
      }
    }
  );

  context.subscriptions.push(runAllTests);
  context.subscriptions.push(runAllUnitTests);
  context.subscriptions.push(runFileTests);
  context.subscriptions.push(runLineTests);
  context.subscriptions.push(runLastTests);
  context.subscriptions.push(openAlternateFile);
};

export function deactivate(): void {}
