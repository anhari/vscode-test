# vscode-test README

Goal: run tests for any language using a plug and play system.

## Features

### Supported Languages

- [x] Elixir
- [ ] JavaScript
- [ ] Python
- [x] Ruby

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `vscode-test.rubyTestCommand`: Defines a command to use for ruby files.
- `vscode-test.rubyTestDirectory`: Defines a directory for ruby tests.
- `vscode-test.rubyTestPattern`: Defines the file name pattern for ruby test files.
- `vscode-test.elixirTestCommand`: Defines a command to use for elixir files.
- `vscode-test.elixirTestDirectory`: Defines a directory for elixir tests.
- `vscode-test.elixirTestPattern`: Defines the file name pattern for elixir test files.

## Known Issues

VS Code [doesn't seem to support waiting for a terminal to be successfully
created before tying to send it some
text](https://github.com/microsoft/vscode/issues/11383).

## Release Notes

TBD.
