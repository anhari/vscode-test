import * as vscode from "vscode";
import { rubyTestRunner } from "./runners/ruby";
import { elixirTestRunner } from "./runners/elixir";
import {
  activeFile,
  executeTestCommand,
  lastTest,
  getActiveTextEditor,
  displayErrorMessage,
  getConfiguration,
  getSetting,
} from "./vscode_utils";
import { rubyFileOpener } from "./openers/ruby";
import { elixirFileOpener } from "./openers/elixir";

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
        switch (file.language) {
          case "ruby":
            rubyTestRunner(file, "file");
            break;
          case "elixir":
            elixirTestRunner(file, "file");
            break;
          default:
            displayErrorMessage(
              `${file.language} is unsupported by vscode-test.`
            );
            break;
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
        switch (file.language) {
          case "ruby":
            rubyTestRunner(file, "line");
            break;
          case "elixir":
            elixirTestRunner(file, "line");
            break;
          default:
            displayErrorMessage(
              `${file.language} is unsupported by vscode-test.`
            );
            break;
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

  let openTestFile = vscode.commands.registerCommand(
    "vscode-test.openTestFile",
    () => {
      const activeTextEditor = getActiveTextEditor();
      if (activeTextEditor) {
        const file = activeFile(activeTextEditor);
        switch (file.language) {
          case "ruby":
            rubyFileOpener(file);
            break;
          case "elixir":
            elixirFileOpener(file);
            break;
          default:
            displayErrorMessage(
              `${file.language} is unsupported by vscode-test.`
            );
            break;
        }
      }
    }
  );

  context.subscriptions.push(runAllTests);
  context.subscriptions.push(runAllUnitTests);
  context.subscriptions.push(runFileTests);
  context.subscriptions.push(runLineTests);
  context.subscriptions.push(runLastTests);
  context.subscriptions.push(openTestFile);
};

export function deactivate(): void {}
