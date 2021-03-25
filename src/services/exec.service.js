const execute = require('child_process').exec

const env = {
    ...process.env
}

if (!env.PATH.includes('.asdf')) {
    env.PATH = `${env.HOME}/.asdf/shims:${env.HOME}/.asdf/bin:${env.PATH}`
}

export const exec = command =>
    new Promise(resolve =>
        execute(command, { env } ,(error, stdout, stderr) =>
            resolve((stdout + stderr).replace(/  +/g, ' '))))