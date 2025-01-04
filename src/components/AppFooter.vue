<template>
  <v-footer 
    class="footer" 
    :color="theme.global.current.colors.background"
  >
    <v-container>
      <v-row justify="center" align="center">
        <!-- Copyright -->
        <v-col cols="auto">
          <span class="text-caption text-grey">
            &copy; 2024 - {{ currentYear }} Gonglin Chen. All rights reserved.
          </span>
        </v-col>
        
        <v-col cols="auto">
          <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fxtcpete.com&count_bg=%23D1988C&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
        </v-col>

        <!-- GitHub Link with Description -->
        <v-col cols="auto" class="d-flex align-center" style="padding: 0 0 0 12px;">
          <span class="text-caption text-grey me-2">
            If you want to use this template:
          </span>
          <v-btn
            icon
            variant="text"
            :href="githubLink"
            target="_blank"
            rel="noopener noreferrer"
            color="grey-darken-1"
          >
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      githubLink: 'https://github.com/xtcpete/vuetify-web',
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme;
    }
  }
}
</script>

<style scoped>
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}

.me-2 {
  margin-right: 8px;
}
</style>
