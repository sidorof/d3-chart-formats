// combine-mods.js
// moved to layout1.vue
export const combineMods = (dfltConfig, mods) => {
  // this may not be the best place for it.
  var params = { ...dfltConfig }

  mods.forEach((mod) => {
    mod.map(line => {
      const branch = line.path.split('.').slice(0, -1)
      const leaf = line.path.split('.').slice(-1)
      var part = params
      for (var i = 0; i < branch.length; i++) {
        part = part[branch[i]]
        part[leaf] = line.value
      }
    })
  })

  return params
}
