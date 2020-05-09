import * as vscode from "vscode";

export const activate = (context: vscode.ExtensionContext) => {
  let runAllTests = vscode.commands.registerCommand(
    "vscode-test.runAllTests",
    () => {
      const activeTextEditor = vscode.window.activeTextEditor;
      if (activeTextEditor) {
        const currentFileName = activeTextEditor.document.fileName;
        const currentLanguage = activeTextEditor.document.languageId;
        const currentLineNumber = activeTextEditor.selection.active.line + 1;
        const currentRelativePath = vscode.workspace.asRelativePath(
          currentFileName
        );
        const existingTerminals = vscode.window.terminals;
        const terminal =
          existingTerminals.find((term) => term.name === "Test Runner") ||
          vscode.window.createTerminal("Test Runner");
        switch (currentLanguage) {
          case "ruby":
            terminal.show(true);
            vscode.commands
              .executeCommand("workbench.action.terminal.clear")
              .then(() => {
                terminal.sendText(
                  `bin/rails test ${currentRelativePath}:${currentLineNumber}`,
                  true
                );
              });
            break;
          default:
            break;
        }
      }
    }
  );
  let runFileTests = vscode.commands.registerCommand(
    "vscode-test.runFileTests",
    () => {
      const activeTextEditor = vscode.window.activeTextEditor;
      if (activeTextEditor) {
        const currentFileName = activeTextEditor.document.fileName;
        const currentLanguage = activeTextEditor.document.languageId;
        const currentLineNumber = activeTextEditor.selection.active.line + 1;
        const currentRelativePath = vscode.workspace.asRelativePath(
          currentFileName
        );
        const existingTerminals = vscode.window.terminals;
        const terminal =
          existingTerminals.find((term) => term.name === "Test Runner") ||
          vscode.window.createTerminal("Test Runner");
        switch (currentLanguage) {
          case "ruby":
            terminal.show(true);
            vscode.commands
              .executeCommand("workbench.action.terminal.clear")
              .then(() => {
                terminal.sendText(
                  `bin/rails test ${currentRelativePath}:${currentLineNumber}`,
                  true
                );
              });
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
        const currentFileName = activeTextEditor.document.fileName;
        const currentLanguage = activeTextEditor.document.languageId;
        const currentLineNumber = activeTextEditor.selection.active.line + 1;
        const currentRelativePath = vscode.workspace.asRelativePath(
          currentFileName
        );
        const existingTerminals = vscode.window.terminals;
        const terminal =
          existingTerminals.find((term) => term.name === "Test Runner") ||
          vscode.window.createTerminal("Test Runner");
        switch (currentLanguage) {
          case "ruby":
            terminal.show(true);
            vscode.commands
              .executeCommand("workbench.action.terminal.clear")
              .then(() => {
                terminal.sendText(
                  `bin/rails test ${currentRelativePath}:${currentLineNumber}`,
                  true
                );
              });
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
      if (activeTextEditor) {
        const currentFileName = activeTextEditor.document.fileName;
        const currentLanguage = activeTextEditor.document.languageId;
        const currentLineNumber = activeTextEditor.selection.active.line + 1;
        const currentRelativePath = vscode.workspace.asRelativePath(
          currentFileName
        );
        const existingTerminals = vscode.window.terminals;
        const terminal =
          existingTerminals.find((term) => term.name === "Test Runner") ||
          vscode.window.createTerminal("Test Runner");
        switch (currentLanguage) {
          case "ruby":
            terminal.show(true);
            vscode.commands
              .executeCommand("workbench.action.terminal.clear")
              .then(() => {
                terminal.sendText(
                  `bin/rails test ${currentRelativePath}:${currentLineNumber}`,
                  true
                );
              });
            break;
          default:
            break;
        }
      }
    }
  );

  context.subscriptions.push(runAllTests);
  context.subscriptions.push(runFileTests);
  context.subscriptions.push(runLineTests);
  context.subscriptions.push(runLastTests);
};

export function deactivate(): void {}
