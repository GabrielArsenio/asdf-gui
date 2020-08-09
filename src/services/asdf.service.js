const { exec } = require('child_process')

export const pluginList = execPath => {
    return new Promise(resolve => {
        exec(`cd ${execPath} && asdf plugin-list`, (error, stdout, stderr) => {
            const pluginList = stdout.split('\n')
            pluginList.pop()
            resolve(pluginList)
        })
    })
}