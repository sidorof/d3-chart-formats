import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base // #3F51B5
      },
      dark: {
        //         primary: colors.blueGrey.darken4, // #263238
        //         secondary: colors.lightBlue.accent4, // #0091EA
        //         accent: colors.indigo.base // #3F51B5
        primary: colors.blue.lighten3, //
        secondary: colors.lightGreen.accent4, // #0091EA
        accent: colors.indigo.base // #3F51B5
      }
    }
  }
})
