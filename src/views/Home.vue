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
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      createTimeseries: 'sample/createTimeseries'
    })
  }
}
</script>
