<template>
  <v-container fluid>
    <v-card>
      <scaling-view/>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Scaling from './Scaling'

export default {
  // think about removing this component completely
  // what purpose does it really serve?
  components: {
    'scaling-view': Scaling
  },
  data: () => ({
    id: 'scale-test',
    numColumns: 3,
    length: 200
  }),
  created: function () {
    this.createTimeseries({ key: 'ts1', numColumns: 3, length: 200 })
    const configId = 'dflt'
    this.setConfig({ id: configId, ...this.getDefaultConfig })
    this.setChart({
      id: this.id, configId: configId, width: null, height: null
    })
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getDefaultConfig: 'chart/getDefaultConfig',
      getData: 'sample/getData'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setChart: 'chart/setChart',
      createTimeseries: 'sample/createTimeseries'
    })
  }
}
</script>
