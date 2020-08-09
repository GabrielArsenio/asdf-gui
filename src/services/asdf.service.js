const { exec } = require('child_process')

export const pluginList = execPath => {
    return new Promise(resolve => {
        exec(`cd ${execPath} && asdf plugin-list`, (error, stdout, stderr) => {
            const pluginNames = stdout.split('\n')
            pluginNames.pop()

            const versionPromisses = []
            const pluginList = []

            pluginNames.forEach(plugin => {
                versionPromisses.push(new Promise(resolve => {
                    exec(`cd ${execPath} && asdf current ${plugin}`, (error, stdout, stderr) => {
                        pluginList.push({
                            name: plugin,
                            version: stdout
                        })
                        resolve()
                    })
                }))
            })

            Promise.all(versionPromisses).then(() => resolve(pluginList))
        })
    })
}

export const list = pluginName => {
  return new Promise(resolve => {
    exec(`asdf list ${pluginName}`, (error, stdout, stderr) => {
      const installedVersions = stdout.split('\n')
      installedVersions.pop()
      resolve(installedVersions)
    })
  })
}

export const listAll = pluginName => {
  return new Promise(resolve => {
    exec(`asdf list-all ${pluginName}`, (error, stdout, stderr) => {
      const installedVersions = stdout.split('\n')
      installedVersions.pop()
      resolve(installedVersions)
    })
  })
}