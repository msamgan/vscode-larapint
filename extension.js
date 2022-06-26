// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode")
const cp = require("child_process")
const fs = require("fs")
const path = require("path")

const PINT_BINARY = "vendor/bin/pint"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand("vscode-larapint.format", async () => {
        const projectDirectory = vscode.workspace.workspaceFolders[0].uri.path
        let binaryExist = fs.existsSync(path.join(projectDirectory, PINT_BINARY))

        if (!binaryExist) {
            return vscode.window.showErrorMessage(
                "Executable not readable or lacks permissions or do not exist - Laravel Pint."
            )
        }

        cp.exec(
            PINT_BINARY,
            {
                cwd: projectDirectory
            },
            // eslint-disable-next-line no-unused-vars
            (err, stdout, stderr) => {
                // console.log("stdout: " + stdout)
                if (err) {
                    return vscode.window.showErrorMessage("Something went wrong while running Laravel Pint.")
                }
            }
        )

        vscode.window.showInformationMessage("Formatting your code with Laravel Pint.")
    })

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
function deactivate() {
    //
}

module.exports = {
    activate,
    deactivate
}
