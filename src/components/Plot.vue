<template>
  <div class="text-center" v-if="chartParams !== null">
    <v-dialog
      ref="dialog"
      v-model="colorModal"
      width="400"
      persistent
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="backgroundColor"
          v-bind="attrs"
          label="Background"
          v-on="on"
          readonly
        >
          <template v-slot:prepend>
            <v-icon :color="backgroundColor">mdi-square</v-icon>
          </template></v-text-field>
      </template>

      <v-card >
        <v-card-title
          class="headline "
          primary-title
        >
          Select Background Color
        </v-card-title>

            <v-color-picker
                v-model="backgroundColor"
                :hide-canvas="false"
                :hide-inputs="false"
                :hide-mode-switch="false"
                :mode.sync="colorPicker.mode"
                :show-swatches="true"
                @input="$emit('input', backgroundColor)"
                class="mx-auto"

            ></v-color-picker>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="close()"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['chartId'],
  data () {
    return {
      date: null,
      chartParams: null,
      backgroundColor: null,
      colorModal: false,
      colorPicker: {
        mode: 'hexa',
        modes: ['rgba', 'hsla', 'hexa']
      }
    }
  },
  mounted () {
    console.log('Plot mounted: started')
    this.chartParams = this.getConfig({ id: this.chartId })
    this.backgroundColor = this.chartParams.plot.background
    console.log('Plot mounted: finished')
  },
  watch: {
    chartParams: function (newData) {
      console.log('watch:backgroundColor: newData', newData)
      console.log('background', newData.plot.background)
    },
    colorModal: function (newData) {
      if (newData) {
        console.log('must be true')
        this.backgroundColor = this.chartParams.plot.background
      } else {
        console.log('must be false')
        this.chartParams.plot.background = this.backgroundColor
      }
      console.log('colorModal', newData)
      console.log('background', this.chartParams.plot.background)
    }
    // getColor: function (newData) {
    //   if (newData !== null || newData !== undefined) {
    //     console.log('watch:getColor: newData', newData)
    //     if (!newData.colorModal) {
    //       switch (newData.type) {
    //         case 'plot.background':
    //           this.chartParams.plot.background = newData.color
    //           console.log('it is done')
    //           break
    //         default:
    //           // pass
    //       }
    //     }
    //   }
    // }
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getConfigIds: 'chart/getConfigIds',
      getColor: 'chart/getColor'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setColor: 'chart/setColor'
    }),
    close () {
      console.log('close: is called', Object.entries(this.chartParams))
      this.chartParams.plot.background = this.background
      this.setConfig(this.chartParams)
      this.colorModal = false
    },
    paramColor (ctype) {
      return {
        type: ctype,
        color: this.chartParams.plot.background,
        colorModal: true
      }
    }
  }
}
</script>
