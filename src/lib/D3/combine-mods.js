// combine-mods.js
// moved to layout1.vue
export const combineMods = (dfltConfig, mods) => {
  // this may not be the best place for it.
  var params = { ...dfltConfig }
  console.log('combineMods: mods', mods)
  console.log('combineMods: mods.length', mods.length)

  mods.forEach((mod) => {
    console.log('mod: typeof', typeof mod)
    mod.map(line => {
      console.log('line', line)
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
