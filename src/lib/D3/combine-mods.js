// combine-mods.js
export const combineMods = (config, modObj) => {
  var params = JSON.parse(JSON.stringify(config))
  modObj.colors = modObj.colors !== undefined
    ? modObj.colors
    : {}
  const mods = modObj.mods
  mods.forEach((mod) => {
    if (mod.path !== undefined) {
      const branch = mod.path.split('.').slice(0, -1)
      const leaf = mod.path.split('.').slice(-1)
      var part = params
      for (var i = 0; i < branch.length; i++) {
        part = part[branch[i]]
      }
      // handle named colors
      part[leaf] = mod.value.toString().startsWith('{')
        ? modObj.colors[mod.value.slice(1, -1)]
        : mod.value
      if (mod.value.toString().startsWith('{')) {
      }
    }
  })
  return params
}
