<template>
  <div class="text-center">
    <v-dialog
      ref="dialog"

      v-model="dialog"
      width="500"
      persistent
      open-on-hover
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="color"
          label="Background"
        ></v-text-field>
      </template>

      <v-card>
        <v-card-title
          class="headline "
          primary-title
        >
          {{ title }}
        </v-card-title>

            <v-color-picker
                v-model="paramColor"
                :hide-canvas="false"
                :hide-inputs="false"
                :hide-mode-switch="false"
                :mode.sync="colorPicker.mode"
                :show-swatches="true"
                class="mx-auto"
            ></v-color-picker>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
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
  props: ['paramColor'],
  data () {
    return {
      dialog: false,
      title: 'Color Selection',
      color: null,
      type: null,
      colorPicker: {
        mode: 'hexa',
        modes: ['rgba', 'hsla', 'hexa']
      }
    }
  },
  mounted () {
    // this.type = this.paramColor.type
    // this.color = this.paramColor.color
    // this.dialog = this.paramColor.dialog
    // console.log('color-picker:mounted:', this.dialog)
  },
  watch: {
    dialog: function (newData) {
      if (newData) {
        var payload = this.getColor
        this.color = payload.color
        this.type = payload.type
      } else {
        this.setColor({
          dialog: newData,
          color: this.color,
          type: this.type
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      getColor: 'chart/getColor'
    })
  },
  methods: {
    ...mapActions({
      setColor: 'chart/setColor'
    })
  }
}

</script>
