const vscode = require("vscode")
const cp = require("child_process")
const {
    checkBinaryExist,
    projectDirectory,
    infoMessage,
    errorMessage,
    currentEditor
} = require("./utils/methods")
const { PINT_BINARY } = require("./utils/constants")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let format = vscode.commands.registerCommand("laravel-pint-vscode.format", async () => {
        if (!checkBinaryExist()) {
            return errorMessage("Pint binary not found. Please install it first.")
        }

        cp.exec(
            PINT_BINARY,
            {
                cwd: projectDirectory()
            },
            // eslint-disable-next-line no-unused-vars
            (err, stdout, stderr) => {
                if (err) {
                    return errorMessage("Something went wrong while running Laravel Pint.")
                }
            }
        )

        return infoMessage("Formatting your project with Laravel Pint.")
    })

    context.subscriptions.push(format)

    let formatFile = vscode.commands.registerCommand("laravel-pint-vscode.format-file", async () => {
        if (!checkBinaryExist()) {
            return errorMessage("Pint binary not found. Please install it first.")
        }

        cp.exec(
            PINT_BINARY + " " + currentEditor(),
            {
                cwd: projectDirectory()
            },
            // eslint-disable-next-line no-unused-vars
            (err, stdout, stderr) => {
                if (err) {
                    return errorMessage("Something went wrong while running Laravel Pint.")
                }
            }
        )

        return infoMessage("Formatting your current file with Laravel Pint.")
    })

    context.subscriptions.push(formatFile)
}

// this method is called when your extension is deactivated
function deactivate() {
    //
}

module.exports = {
    activate,
    deactivate
}
