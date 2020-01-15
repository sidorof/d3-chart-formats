<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card
          justify-center
          :height=startHeight
          color="grey lighten-2"
          flat
          tile
          outlined
        >
          <isolate :startHeight="startHeight"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="5">
        <v-card
          color=" lighten-2"
          :height=startHeight
          flat
          tile
          outlined
        >
         <isolate :startHeight="startHeight"/>
        </v-card>
      </v-col>
      <v-col  cols="4">
        <v-card
          color="grey lighten-2"
          :height=startHeight
          flat
          tile
          outlined
        >
          <isolate :startHeight="startHeight"/>
        </v-card>
      </v-col>
      <v-col  cols="3">
        <v-card
          color="grey lighten-2"
          :height=startHeight
          flat
          tile
          outlined
        >
          <isolate :startHeight="startHeight"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Isolate from '../components/Isolate'

export default {
  components: {
    isolate: Isolate
  },
  data: () => ({
    justify: [
      'start',
      'end',
      'center',
      'space-between',
      'space-around'
    ],
    startHeight: 400
  })
}
</script>
