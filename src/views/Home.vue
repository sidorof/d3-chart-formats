<template>
  <v-card>
    <layout1 :params="params"/>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Layout1 from './Layout1'

export default {
  components: {
    layout1: Layout1
  },
  data: () => ({
    id: 'test',
    layoutNum: '1',
    valid: true,
    numColumns: 3,
    length: 200,
    params: null
  }),
  mounted: function () {
    this.createTimeseries({ key: 'ts1', numColumns: 3, length: 200 })
    this.params = this.getDefaultConfig
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getDefaultConfig: 'chart/getDefaultConfig',
      getTs: 'sample/getTs'
    }),
    rules () {
      const rules = []
      if (this.numColumns) {
        const rule =
          v => ((v > 0 && v < 30) || '') <= this.max ||
            `A maximum of ${this.numColumns} columns is allowed`

        rules.push(rule)
      }
      if (this.length) {
        const rule =
          v => ((v > 0 && v < 3000) || '').length <= this.max ||
            `A maximum of ${this.length} periods is allowed`

        rules.push(rule)
      }
      return rules
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      createTimeseries: 'sample/createTimeseries',
      applyConfigPrices: 'prices/applyConfigPrices'
    }),
    recalcTs (numColumns, length) {
      this.createTimeseries({
        key: 'ts1', numColumns: numColumns, length: length })
    },
    newData (numColumns, length) {
      // prep for various plot types switch
      this.recalcTs(this.numColumns, this.length)
      console.log('setting valid to false')
      this.valid = false
      console.log('this.valid', this.valid)
    }
  }
}
</script>
