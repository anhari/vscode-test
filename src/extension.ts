import * as vscode from "vscode";
import { rubyTestRunner } from "./runners/ruby";
import { elixirTestRunner } from "./runners/elixir";
import {
  activeFile,
  executeTestCommand,
  lastTest,
  getActiveTextEditor,
  getConfigurationSetting,
  displayErrorMessage,
} from "./vscode_utils";

export const activate = (context: vscode.ExtensionContext) => {
  let runAllTests = vscode.commands.registerCommand(
    "vscode-test.runAllTests",
    () => {
      const activeTextEditor = getActiveTextEditor();
      const runAllTestsCommand = getConfigurationSetting("runAllTestsCommand");
      if (runAllTestsCommand) {
        executeTestCommand(runAllTestsCommand, activeTextEditor);
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

  context.subscriptions.push(runAllTests);
  context.subscriptions.push(runFileTests);
  context.subscriptions.push(runLineTests);
  context.subscriptions.push(runLastTests);
};

export function deactivate(): void {}
