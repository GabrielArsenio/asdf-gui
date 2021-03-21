const { exec } = require('./exec.service')

export const pluginList = async execPath => {
    const pluginNames = (await exec(`cd ${execPath} && asdf plugin-list`)).split('\n')
    pluginNames.pop()

    const versionPromisses = []
    const pluginList = []

    pluginNames.forEach(plugin => {
        versionPromisses.push(
            exec(`cd ${execPath} && asdf current ${plugin}`)
            .then(stdout => {
                pluginList.push({
                    name: plugin,
                    version: stdout.split(' ')[1]
                })
            }))
    })

    return Promise.all(versionPromisses).then(() => pluginList)
}

export const list = async pluginName => {
    const installedVersions = (await exec(`asdf list ${pluginName}`)).replace(/ +/g, '').split('\n')
    installedVersions.pop()
    installedVersions.reverse()
    return installedVersions
}

export const listAll = async pluginName => {
    const installedVersions = (await exec(`asdf list-all ${pluginName}`)).split('\n')
    installedVersions.pop()
    installedVersions.reverse()
    return installedVersions
}

export const set = (scope, pluginName, version) => exec(`asdf ${scope} ${pluginName} ${version}`)

export const install = (pluginName, version) => exec(`asdf install ${pluginName} ${version}`)