<template>
  <v-app>
    <v-app-bar
      color="grey-lighten-4"
      height="50"
      flat
    >
    <v-row justify="left" justify-md="center">
        <!-- Navigation for Larger Screens -->
        <v-col cols="auto" class="d-block d-md-none">
          <v-app-bar-nav-icon @click="drawer = !drawer" />
        </v-col>
        
        <v-col class="d-none d-md-flex" cols="auto">
          <v-btn
            class="me-2"
            color="black"
            height="40"
            width="auto"
            variant="text"
            @click="scrollToSection('home')"
          >
            Home
          </v-btn>
          <v-btn
            class="me-2"
            color="black"
            height="40"
            width="auto"
            variant="text"
            @click="scrollToSection('publications')"
          >
            Publications
          </v-btn>
          <v-btn
            class="me-2"
            color="black"
            height="40"
            width="auto"
            variant="text"
            @click="scrollToSection('experience')"
          >
            Experience
          </v-btn>
          <v-btn
            class="me-2"
            color="black"
            height="40"
            width="auto"
            variant="text"
            @click="scrollToSection('projects')"
          >
            Projects
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
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);

const scrollToSection = (section) => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<script>
export default {
  name: "RoundButton",
  data() {
    return {
      showPopup: true, // Controls the popup visibility
    };
  },
  mounted() {
    // Hide the popup after 3 seconds
    setTimeout(() => {
      this.showPopup = false;
    }, 3000); // Adjust timing as needed
  },
};
</script>