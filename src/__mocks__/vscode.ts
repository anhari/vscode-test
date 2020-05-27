const workspace = {
  getConfiguration: jest.fn(() => ({
    get: jest.fn(),
  })),
  workspaceFolders: [],
  onDidSaveTextDocument: jest.fn(),
};

const vscode = {
  workspace,
};

module.exports = vscode;
