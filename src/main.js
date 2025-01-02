/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import { main } from './data/main.js'
import { details } from './data/details'

// Composables
import { createApp } from 'vue'

// Initialize Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// Data initialization
const experiences_data = main[0]['Experiences']
const info_data = main[1]['Info']
const education_data = main[2]['Education']
const projects_data = main[3]['Projects']
const publications_data = main[4]['Publications']

app.config.globalProperties.$info_data = info_data
app.config.globalProperties.$experiences_data = experiences_data
app.config.globalProperties.$education_data = education_data
app.config.globalProperties.$projects_data = projects_data
app.config.globalProperties.$publications_data = publications_data
app.config.globalProperties.$detailsData = details
app.config.globalProperties.$mainData = main
// Register plugins and Vuetify
registerPlugins(app)

// Mount the application
app.mount('#app')