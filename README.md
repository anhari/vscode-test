# vscode-test

Goal: run tests for any language using a plug and play system.

## Features

### Supported Languages

- [x] Elixir
- [ ] JavaScript
- [ ] Python
- [x] Ruby (defaults to MiniTest with Rails, [can be configured with RSpec])

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `vscode-test.rubyTestCommand`: Defines a command to use for ruby files (default: `bin/rails test`).
- `vscode-test.rubyTestDirectory`: Defines a directory for ruby tests (default: `test`).
- `vscode-test.rubyTestPattern`: Defines the file name pattern for ruby test files (default: `_test.rb`).
- `vscode-test.elixirTestCommand`: Defines a command to use for elixir files (default: `mix test`).
- `vscode-test.elixirTestDirectory`: Defines a directory for elixir tests (default: `test`).
- `vscode-test.elixirTestPattern`: Defines the file name pattern for elixir test files (default: `_test.exs`).

You can specify any test settings that might be specific for a given project by defining these settings in `~your_project_root/.vscode/settings.json`.

## Known Issues

VS Code [doesn't seem to support waiting for a terminal to be successfully
created before tying to send it some
text](https://github.com/microsoft/vscode/issues/11383), so you may need to run your first test twice as a result.

## Release Notes

TBD.

[can be configured with RSpec]: https://github.com/anhari/vscode-test/wiki/Configure-the-ruby-test-runner-to-use-RSpec
