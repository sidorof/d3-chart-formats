<template>
  <v-container
    fluid
    class="mt-0 pt-0"
  >
    <v-sheet
      :max-width="getMaxWidth"
    >
      <v-slide-group
        mandatory
        show-arrows
     >
        <v-slide-item
          v-for="mod in getModList"
          :key="mod.id"
          v-slot="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            :v-model="mod"
            active-class="primary black--text"
            style="background-color: #444;"
            depressed
            rounded
            @click="setModType(mod, toggle)"
          >
            {{ mod.id }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    showArrows: true,
    prevIcon: true,
    nextIcon: true,
    active: 2
  }),
  computed: {
    ...mapGetters({
      getMods: 'chart/getMods'
    }),
    getModList () {
      const modList = []
      for (const modId in this.getMods) {
        const mod = this.getMods[modId]
        modList.push({ id: modId, ...mod })
      }
      return modList
    },
    getMaxWidth () {
      return document.documentElement.clientWidth * 0.9
    }
  },
  methods: {
    ...mapActions({
      setCurrentMod: 'chart/setCurrentMod'
    }),
    setModType (mod, toggle) {
      toggle()
      this.setCurrentMod(mod)
    }
  }
}
</script>
