import * as vscode from "vscode";

const TERMINAL_NAME = "Test Runner";
let lastTest: string;

const activeFile = (activeTextEditor: vscode.TextEditor) => {
  return {
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
            if (file.fileName.match(/_spec.rb$/)) {
              executeTestCommand(
                `bin/rspec ${file.relativePath}`,
                activeTextEditor
              );
            } else {
              executeTestCommand(
                `bin/rails test ${file.relativePath}`,
                activeTextEditor
              );
            }
            break;
          case "elixir":
            executeTestCommand(
              `mix test ${file.relativePath}`,
              activeTextEditor
            );
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
            if (file.fileName.match(/_spec.rb$/)) {
              executeTestCommand(
                `bin/rspec ${file.relativePath}:${file.lineNumber}`,
                activeTextEditor
              );
            } else {
              executeTestCommand(
                `bin/rails test ${file.relativePath}:${file.lineNumber}`,
                activeTextEditor
              );
            }
            break;
          case "elixir":
            executeTestCommand(
              `mix test ${file.relativePath}:${file.lineNumber}`,
              activeTextEditor
            );
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
