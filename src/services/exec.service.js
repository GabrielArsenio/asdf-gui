const execute = require('child_process').exec

export const exec = command =>
    new Promise(resolve =>
        execute(command, (error, stdout, stderr) =>
            resolve((stdout + stderr).replace(/  +/g, ' '))))