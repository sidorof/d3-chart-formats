<template>
  <v-card>
    <div>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Update Data</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col
                    cols="4"
                  >
                    <v-slider
                      v-model="numColumns"
                      label="Number of Columns"
                      min="1"
                      max="30"
                      thumb-label
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="numColumns"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                    <v-slider
                      v-model="length"
                      label="Time Series Periods"
                      thumb-label
                      min="5"
                      max="3000"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="length"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                    <v-btn
                        color="primary"
                        @click="newData()"
                    >
                      Update Data
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

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
      console.log('theoretically recalced')
    }
  }
}
</script>
