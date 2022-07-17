const vscode = require("vscode")
const { PINT_BINARY } = require("./constants")
const fs = require("fs")
const path = require("path")

/**
 * Returns the path to the project directory.
 * @returns {string} The path to the project directory.
 */
exports.projectDirectory = () => {
    return vscode.workspace.workspaceFolders[0].uri.path
}

/**
 * Returns the current editor's file name.
 * @returns {string} The current editor's file name.
 */
exports.currentEditor = () => {
    return vscode.window.activeTextEditor.document.fileName
}

/**
 * Checks if the pint binary is installed on the system.
 * @returns {boolean} - true if the binary is installed, false otherwise.
 */
exports.checkBinaryExist = () => {
    return fs.existsSync(path.join(this.projectDirectory(), PINT_BINARY)) ? true : false
}

/**
 * Copies the pint.json file to the project directory.       
 * @returns None       
 */
exports.copyPintJson = () => {
    const pintJson = path.join(this.projectDirectory(), "pint.json")
    const pintJsonBackup = path.join(this.projectDirectory(), "pint.json.backup")
    if (fs.existsSync(pintJson)) {
        fs.renameSync(pintJson, pintJsonBackup)
    }
    fs.copyFileSync(path.join(__dirname, "pint.json"), pintJson)
}

/**
 * Displays a message to the user.
 * @param {string} message - the message to display
 * @returns None
 */
exports.infoMessage = (message) => {
    return vscode.window.showInformationMessage(message)
}

/**
 * Displays an error message to the user.
 * @param {string} message - the message to display to the user
 * @returns None
 */
exports.errorMessage = (message) => {
    return vscode.window.showErrorMessage(message)
}
