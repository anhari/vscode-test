import * as vscode from "vscode";

let lastTest: string;
const TERMINAL_NAME = "Test Runner";

type ActiveFile = {
  activeTextEditor: vscode.TextEditor;
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

export {
  ActiveFile,
  activeFile,
  findOrCreateTerminal,
  getActiveTextEditor,
  getConfigurationSetting,
  executeTestCommand,
  lastTest,
};
