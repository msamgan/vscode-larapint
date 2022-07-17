const vscode = require("vscode")
const cp = require("child_process")
const {
    checkBinaryExist,
    projectDirectory,
    infoMessage,
    errorMessage,
    currentEditor,
    copyPintJson
} = require("./utils/methods")
const { PINT_BINARY } = require("./utils/constants")

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let format = vscode.commands.registerCommand("laravel-pint-vscode.format", async () => {
        if (!checkBinaryExist()) {
            return await vscode.window
                .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
                .then((answer) => {
                    infoMessage("Initiating installation...")
                    if (answer === "Yes") {
                        cp.exec(
                            "composer require laravel/pint",
                            {
                                cwd: projectDirectory()
                            },
                            // eslint-disable-next-line no-unused-vars
                            (err, stdout, stderr) => {
                                if (err) {
                                    return errorMessage("Something went wrong while running Laravel Pint.")
                                } else {
                                    return infoMessage("Initiating complete...")
                                }
                            }
                        )
                    }
                })
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
                } else {
                    return infoMessage("Formatting your project with Laravel Pint.")
                }
            }
        )
    })

    context.subscriptions.push(format)

    let formatFile = vscode.commands.registerCommand("laravel-pint-vscode.format-file", async () => {
        if (!checkBinaryExist()) {
            return await vscode.window
                .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
                .then((answer) => {
                    infoMessage("Initiating installation...")
                    if (answer === "Yes") {
                        cp.exec(
                            "composer require laravel/pint",
                            {
                                cwd: projectDirectory()
                            },
                            // eslint-disable-next-line no-unused-vars
                            (err, stdout, stderr) => {
                                if (err) {
                                    return errorMessage("Something went wrong while running Laravel Pint.")
                                } else {
                                    return infoMessage("Initiating complete...")
                                }
                            }
                        )
                    }
                })
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
                } else {
                    return infoMessage("Formatting your current file with Laravel Pint.")
                }
            }
        )
    })

    context.subscriptions.push(formatFile)

    let publishConfig = vscode.commands.registerCommand("laravel-pint-vscode.publish-config", async () => {
        if (!checkBinaryExist()) {
            return await vscode.window
                .showInformationMessage("Pint binary not found. Do you want in install?", "Yes", "No")
                .then((answer) => {
                    infoMessage("Initiating installation...")
                    if (answer === "Yes") {
                        cp.exec(
                            "composer require laravel/pint",
                            {
                                cwd: projectDirectory()
                            },
                            // eslint-disable-next-line no-unused-vars
                            (err, stdout, stderr) => {
                                if (err) {
                                    return errorMessage("Something went wrong while running Laravel Pint.")
                                } else {
                                    return infoMessage("Initiating complete...")
                                }
                            }
                        )
                    }
                })
        }

        copyPintJson()
        return infoMessage("pint.json copied to your project.")
    })

    context.subscriptions.push(publishConfig)
}

// this method is called when your extension is deactivated
function deactivate() {
    //
}

module.exports = {
    activate,
    deactivate
}
