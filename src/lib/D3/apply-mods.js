import { combineMods } from './combine-mods'

export const applyMods = (
  {
    vm,
    modId,
    chartId,
    chartTypeId,
    width,
    height
  }) => {
  if (modId !== undefined && modId !== null) {
    var config = JSON.parse(
      JSON.stringify(
        {
          id: modId,
          // ...this.getDefaultConfig
          ...vm.$store.state.chart.defaults.config
        }
      )
    )

    const modObj = JSON.parse(JSON.stringify(vm.getMod({ id: modId })))
    config = combineMods(config, modObj)
    vm.setChart(
      {
        id: chartId,
        config: config,
        height: height,
        width: width,
        chartTypeId: chartTypeId
      }
    )
  }
}
