<template>
  <v-app>
    <v-app-bar
      :color="theme.global.current.value.colors.background"
      height="50"
      flat
    >
    <v-row justify="center">
        <!-- Navigation for Larger Screens -->
        <v-col cols="auto" class="d-block d-md-none">
          <v-app-bar-nav-icon @click="drawer = !drawer" />
        </v-col>
        
        <v-col class="d-none d-md-flex" cols="auto">
          <v-btn
            class="me-2"
            color="auto"
            height="50"
            width="auto"
            variant="text"
            @click="scrollToSection('home')"
          >
            Home
          </v-btn>
          <v-btn
            class="me-2"
            color="auto"
            height="50"
            width="auto"
            variant="text"
            @click="scrollToSection('publications')"
          >
            Publications
          </v-btn>
          <v-btn
            class="me-2"
            color="auto"
            height="50"
            width="auto"
            variant="text"
            @click="scrollToSection('experience')"
          >
            Experience
          </v-btn>
          <v-btn
            class="me-2"
            color="auto"
            height="50"
            width="auto"
            variant="text"
            @click="scrollToSection('projects')"
          >
            Projects
          </v-btn>
        </v-col>

        <!-- Add theme toggle button -->
        <v-col cols="auto" class="d-flex align-center">
          <v-btn
            icon
            variant="text"
            @click="toggleTheme"
          >
            <v-icon>
              {{ theme.global.current.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>

    </v-app-bar>

    <!-- Drawer for Small Screens -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      width="250"
    >
      <v-list>
        <v-list-item @click="scrollToSection('home')">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="scrollToSection('publications')">
          <v-list-item-title>Publications</v-list-item-title>
        </v-list-item>
        <v-list-item @click="scrollToSection('experience')">
          <v-list-item-title>Experience</v-list-item-title>
        </v-list-item>
        <v-list-item @click="scrollToSection('projects')">
          <v-list-item-title>Projects</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <!-- Add the footer -->
    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import AppFooter from '@/components/AppFooter.vue';

const drawer = ref(false);
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  // Optionally save theme preference to localStorage
  localStorage.setItem('theme', theme.global.name.value);
};

// Load saved theme preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});

const scrollToSection = (section) => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<script>
export default {
  name: "App",
  components: {
    AppFooter
  },
  data() {
    return {
      showPopup: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  },
};
</script>