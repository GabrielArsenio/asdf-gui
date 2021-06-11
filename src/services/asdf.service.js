const { exec } = require('./exec.service')

export const current = async () => {
    const currentList = (await exec(`asdf current`)).split('\n')
    currentList.pop()    

    return currentList.map(item => {
        return {
            name: item.split(' ')[0],
            version: item.split(' ')[1]
        }
    })
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

export const uninstall = (pluginName, version) => exec(`asdf uninstall ${pluginName} ${version}`)

export const add = pluginName => exec(`asdf plugin add ${pluginName}`)

export const pluginRemove = pluginName => exec(`asdf plugin remove ${pluginName}`)