/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#00ADB5',
          secondary: '#393E46',
          background: '#ECECEC',
          surface: '#F5F5F5',
          'on-surface': '#222831',
          'text-primary': '#222831',
          'text-secondary': '#555555',
        },
      },
      dark: {
        colors: {
          primary: '#00ADB5',
          secondary: '#393E46',
          background: '#333333',
          surface: '#1E1E1E',
          'on-surface': '#EEEEEE',
          'text-primary': '#FFFFFF',
          'text-secondary': '#CCCCCC',
        },
      },
    },
  },
})
