<template>
  <v-card-actions class="justify-space-between">
    <v-col cols="2" >
      <v-row>
        <v-btn
          text
          @click="prev"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-card outlined>
          <div>
            <v-card-title class="body">
              <div  width="70">
              {{ modId }}
              </div>
            </v-card-title>
          </div>
        </v-card>
      </v-row>
      <v-row>
        <v-btn
          text
          @click="next"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-card-actions>
</template>
