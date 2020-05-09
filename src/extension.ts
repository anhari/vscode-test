import * as vscode from "vscode";
import { rubyTestRunner } from "./runners/ruby";
import { elixirTestRunner } from "./runners/elixir";
import {
  activeFile,
  executeTestCommand,
  lastTest,
  getActiveTextEditor,
  getConfigurationSetting,
} from "./vscode_utils";

export const activate = (context: vscode.ExtensionContext) => {
  const activeTextEditor = getActiveTextEditor();

  let runAllTests = vscode.commands.registerCommand(
    "vscode-test.runAllTests",
    () => {
      const runAllTestsCommand = getConfigurationSetting("runAllTestsCommand");
      if (runAllTestsCommand) {
        executeTestCommand(runAllTestsCommand, getActiveTextEditor());
      }
    }
  );

  let runFileTests = vscode.commands.registerCommand(
    "vscode-test.runFileTests",
    () => {
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
            break;
        }
      }
    }
  );
  let runLineTests = vscode.commands.registerCommand(
    "vscode-test.runLineTests",
    () => {
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
            break;
        }
      }
    }
  );

  let runLastTests = vscode.commands.registerCommand(
    "vscode-test.runLastTests",
    () => {
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
