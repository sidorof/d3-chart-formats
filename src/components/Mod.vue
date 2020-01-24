<template>
  <v-row justify="center">
              <v-card color="#555" class="ml-2 pl-3">
                <v-card-title class="title" >Modifications to Tree</v-card-title>
                <div>{{ getMod({ id: modId }).desc }}</div>
                <div v-if="hasColors">
                  <div class="pl-3">color labels</div>
                  <v-col >
                  <v-card
                    color="#aaa" class="mb-3 mr-4 px-5 black--text"
                    v-for="(color, j) in Object.keys(currentMod.colors)"
                    :key="j"
                  >
                    <div> {{ color }}: {{ getColor(currentMod.colors, color)}}</div>

                    <v-icon large :color="getColor(currentMod.colors, color)"> mdi-card </v-icon>
                  </v-card>
                  </v-col>
                </div>
                <div
                  v-for="(mod, n) in getMod({ id: modId }).mods"
                  :key=n
                >
                  <v-col >
                    <v-card color="#aaa" class="mr-4 px-5 black--text" >
                      <div class="body-2">/{{mod.path}}</div>
                      <div >value: {{ mod.value }}</div>
                      <v-icon v-if="asColor(mod.value)" :color="asColor(mod.value)">
                        mdi-card
                      </v-icon>
                    </v-card>
                  </v-col>
                </div>
              </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['currentMod', 'modId'],
  data () {
    return {
      dialogm1: '',
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      getMods: 'chart/getMods',
      getMod: 'chart/getMod'
    }),
    hasColors () {
      if (this.currentMod.colors !== undefined) {
        if (Object.keys(this.currentMod.colors).length > 0) {
          return true
        }
      }
      return false
    },
    getModIds () {
      return Object.keys(this.getMods)
    }
  },
  methods: {
    getColor (colorObj, color) {
      return colorObj[color]
    },
    asColor (value) {
      // doesn't check for color words, only hex
      const strValue = value.toString()
      if (strValue.startsWith('#')) {
        return strValue
      } else {
        return false
      }
    }
  }
}
</script>
