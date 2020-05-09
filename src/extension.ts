import * as vscode from "vscode";
import { rubyTestRunner } from "./runners/ruby";
import { elixirTestRunner } from "./runners/elixir";

const TERMINAL_NAME = "Test Runner";
let lastTest: string;

type ActiveFile = {
  activeTextEditor: vscode.TextEditor;
  fileName: string;
  language: string;
  relativePath: string;
  lineNumber: number;
};

const activeFile = (activeTextEditor: vscode.TextEditor): ActiveFile => {
  return {
    activeTextEditor,
    fileName: activeTextEditor.document.fileName,
    language: activeTextEditor.document.languageId,
    relativePath: vscode.workspace.asRelativePath(
      activeTextEditor.document.fileName
    ),
    lineNumber: activeTextEditor.selection.active.line + 1,
  };
};

const findOrCreateTerminal = () => {
  const existingTerminals = vscode.window.terminals;
  return (
    existingTerminals.find((term) => term.name === TERMINAL_NAME) ||
    vscode.window.createTerminal(TERMINAL_NAME)
  );
};

const executeTestCommand = (
  command: string,
  activeTextEditor: vscode.TextEditor | undefined
) => {
  activeTextEditor?.document.save();
  vscode.commands.executeCommand("workbench.action.terminal.clear").then(() => {
    const terminal = findOrCreateTerminal();
    terminal.sendText(command, true);
    lastTest = command;
  });
};

export const activate = (context: vscode.ExtensionContext) => {
  let runAllTests = vscode.commands.registerCommand(
    "vscode-test.runAllTests",
    () => {
      const runAllTestsCommand:
        | string
        | undefined = vscode.workspace
        .getConfiguration("vscode-test")
        .get("runAllTestsCommand");

      if (runAllTestsCommand) {
        executeTestCommand(runAllTestsCommand, vscode.window.activeTextEditor);
      }
    }
  );

  let runFileTests = vscode.commands.registerCommand(
    "vscode-test.runFileTests",
    () => {
      const activeTextEditor = vscode.window.activeTextEditor;
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
      const activeTextEditor = vscode.window.activeTextEditor;
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
      const activeTextEditor = vscode.window.activeTextEditor;

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

export { ActiveFile, executeTestCommand };
