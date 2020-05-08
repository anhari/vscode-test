import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let runAllTests = vscode.commands.registerCommand(
    "vscode-test.runAllTests",
    () => console.log("ran all tests")
  );
  let runFileTests = vscode.commands.registerCommand(
    "vscode-test.runFileTests",
    () => console.log("ran file tests")
  );
  let runLineTests = vscode.commands.registerCommand(
    "vscode-test.runLineTests",
    () => console.log("ran line tests")
  );
  let runLastTests = vscode.commands.registerCommand(
    "vscode-test.runLastTests",
    () => console.log("ran last tests")
  );

  context.subscriptions.push(runAllTests);
  context.subscriptions.push(runFileTests);
  context.subscriptions.push(runLineTests);
  context.subscriptions.push(runLastTests);
}

export function deactivate(): void {}
