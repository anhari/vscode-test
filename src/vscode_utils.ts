import * as vscode from "vscode";

let lastTest: string;
const TERMINAL_NAME = "Test Runner";

type ActiveFile = {
  activeTextEditor: vscode.TextEditor;
  workspaceRoot: string | undefined;
  fileName: string;
  language: string;
  relativePath: string;
  lineNumber: number;
};

const getActiveTextEditor = (): vscode.TextEditor | undefined =>
  vscode.window.activeTextEditor;

const getConfigurationSetting = (setting: string): string | undefined => {
  return vscode.workspace.getConfiguration("vscode-test").get(setting);
};

const activeFile = (activeTextEditor: vscode.TextEditor): ActiveFile => {
  return {
    activeTextEditor,
    workspaceRoot: vscode.workspace.rootPath,
    fileName: activeTextEditor.document.fileName,
    language: activeTextEditor.document.languageId,
    relativePath: vscode.workspace.asRelativePath(
      activeTextEditor.document.fileName
    ),
    lineNumber: activeTextEditor.selection.active.line + 1,
  };
};

const findOrCreateTerminal = (): vscode.Terminal => {
  const existingTerminals = vscode.window.terminals;
  return (
    existingTerminals.find((term) => term.name === TERMINAL_NAME) ||
    vscode.window.createTerminal(TERMINAL_NAME)
  );
};

const executeTestCommand = (
  command: string,
  activeTextEditor: vscode.TextEditor | undefined
): void => {
  if (activeTextEditor) {
    activeTextEditor.document.save();
    vscode.commands
      .executeCommand("workbench.action.terminal.clear")
      .then(() => {
        const terminal = findOrCreateTerminal();
        terminal.show(true);
        terminal.sendText(command, true);
        vscode.window.showTextDocument(activeTextEditor.document);
        lastTest = command;
      });
  }
};

const displayErrorMessage = (message: string) => {
  vscode.window.showErrorMessage(message);
};

const openFile = (path: string) => {
  vscode.workspace.openTextDocument(path).then(
    (doc) => {
      vscode.window.showTextDocument(doc);
    },
    () => displayErrorMessage(`vscode-test: File could not be found: ${path}`)
  );
};

export {
  ActiveFile,
  activeFile,
  displayErrorMessage,
  findOrCreateTerminal,
  getActiveTextEditor,
  getConfigurationSetting,
  executeTestCommand,
  lastTest,
  openFile,
};
