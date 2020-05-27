const workspace = {
  getConfiguration: jest.fn(() => ({
    get: jest.fn(),
  })),
  workspaceFolders: [],
  onDidSaveTextDocument: jest.fn(),
  openTextDocument: jest.fn(() => ({
    then: jest.fn(),
  })),
};

const vscode = {
  workspace,
};

module.exports = vscode;
