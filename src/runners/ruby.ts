import { ActiveFile, executeTestCommand } from "../extension";

const rubyTestRunner = (file: ActiveFile, scope: "file" | "line") => {
  let command: string;
  if (scope === "line") {
    command = `${file.relativePath}:${file.lineNumber}`;
  } else {
    command = `${file.relativePath}`;
  }

  if (file.fileName.match(/_spec.rb$/)) {
    executeTestCommand(`bin/rspec ${command}`, file.activeTextEditor);
  } else {
    executeTestCommand(`bin/rails test ${command}`, file.activeTextEditor);
  }
};

export { rubyTestRunner };
