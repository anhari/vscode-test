# vscode-test

Goal: run tests for any language using a plug and play system. Inspired by [vim-test](https://github.com/vim-test/vim-test).

## Features

### Supported Languages

- [x] Elixir
- [x] Ruby (defaults to MiniTest with Rails, [can be configured with RSpec](https://github.com/anhari/vscode-test/wiki/Configure-the-ruby-test-runner-to-use-RSpec))
- [x] TypeScript


### Commands

- `Run All Tests` - run all tests in a workspace (defined by `vscode-test.runAllTestsCommand`).
- `Run All Unit Tests` - run all unit tests in a workspace (defined by `vscode-test.runAllUnitTestsCommand`).
- `Run File Tests` - run all tests for the current file.
- `Run Current Line Test` - run test on the current line.
- `Run Last Tests` - rerun the last test command.
- `Open Alternate File` - jump from a file to its test and vice-versa (i.e. `app/models/user.rb`
  &rarr; `test/models/user_test.rb` and `test/models/user_test.rb` &rarr; `app/models/user.rb`).

## Extension Settings

This extension contributes the following settings:

- `vscode-test.maximizeTerminal`: Maximizes the test runner terminal when a command is run (default: `false`).
- `vscode-test.rubyTestCommand`: Defines a command to use for ruby files (default: `bin/rails test`).
- `vscode-test.rubyTestDirectory`: Defines a directory for ruby tests (default: `test`).
- `vscode-test.rubyTestPattern`: Defines the file name pattern for ruby test files (default: `_test.rb`).
- `vscode-test.elixirTestCommand`: Defines a command to use for elixir files (default: `mix test`).
- `vscode-test.elixirTestDirectory`: Defines a directory for elixir tests (default: `test`).
- `vscode-test.elixirTestPattern`: Defines the file name pattern for elixir test files (default: `_test.exs`).

You can specify any test settings that might be specific for a given project by defining these settings in `~/your_project_root/.vscode/settings.json`.

## Known Issues

VS Code [doesn't seem to support waiting for a terminal to be successfully
created before tying to send it some
text](https://github.com/microsoft/vscode/issues/11383), so you may need to run your first test twice as a result.

## Release Notes

TBD.
