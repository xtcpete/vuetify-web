<template>
    <v-sheet class="profile-container" color="grey-lighten-4">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-card class="profile-card" elevation="2">
            <v-row>
                <v-col cols="12">
                    <h2 class="text-left">Projects</h2>
                </v-col>
            </v-row>
  
            <!-- Projects Grid -->
            <v-row class="projects-grid">
                <v-col
                v-for="(project, index) in visibleProjects"
                :key="index"
                cols="12"
                md="4"
                class="project-block"
                :class="{
                  'last-row': isLastRow(index),
                  'single-column': isSmallScreen,
                  'no-bottom-border': isLastItem(index)
                }"
                >
                  <a :href="project.id" target="_blank" class="project-content">
                    <h3 class="project-title">{{ project.Title }}</h3>
                    <p class="project-description">{{ project.Description }}</p>
                    <v-row class="skills" justify="start" align="center">
                            <v-chip
                                v-for="(skill, skillIndex) in splitSkills(project.Skills)"
                                :key="skillIndex"
                                class="mt-3 mr-3 skill-chip"
                                outlined
                                color="cyan lighten-2"
                                text-color="white"
                                >
                                {{ skill }}
                            </v-chip>
                    </v-row>
                  </a>
                </v-col>
            </v-row>
          
            <!-- Single Toggle Button -->
            <div class="text-center" v-if="projects.length > maxVisibleProjects">
                <v-btn @click="toggleCollapse" color="#00ADB5" outlined>
                <v-icon left>{{ showMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                {{ showMore ? "Show Less" : "Show More" }}
                </v-btn>
            </div>
          </v-card>
        </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      showMore: false, // Toggles between showing more or less
      maxVisibleProjects: 6, // 5 rows * 3 columns
      isSmallScreen: window.innerWidth < 960, // Initial screen size detection
    };
  },
  computed: {
    projects() {
      // Access projects data and prioritize Demo projects
      return Object.values(this.$projects_data).sort((a, b) => {
        return b.Demo - a.Demo; // Demo projects first
      });
    },
    visibleProjects() {
      // Show only maxVisibleProjects if showMore is false
      return this.showMore ? this.projects : this.projects.slice(0, this.maxVisibleProjects);
    },
  },
  methods: {
    toggleCollapse() {
      this.showMore = !this.showMore; // Toggle between showing more or less
    },
    splitSkills(skills) {
        return skills ? skills.split(',').map(skill => skill.trim()) : [];
    },
    isLastRow(index) {
      if (this.isSmallScreen) {
        return false; // No "last-row" concept in single-column layout
      }
      const colsPerRow = 3; // Number of columns per row for medium and larger screens
      return index >= Math.floor((this.visibleProjects.length - 1) / colsPerRow) * colsPerRow;
    },
    isLastItem(index) {
      return index >= (this.visibleProjects.length - 1); // Last item in the grid
    },
    handleResize() {
      this.isSmallScreen = window.innerWidth < 960; // Update screen size on resize
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
.profile-container {
  padding: 20px;
  padding-top: 0;
}

.profile-card {
  border-radius: 20px;
  padding: 20px;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
}

.project-block {
  position: relative;
  padding: 0;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}

.project-block:nth-child(3n) {
  border-right: none; /* Remove border for the last column in a row */
}

.project-block.last-row {
  border-bottom: none; /* Remove bottom border for blocks in the last row */
}

.project-block.single-column {
  border-right: none; /* Remove right border for single-column layout */
}

.project-block.no-bottom-border {
  border-bottom: none; /* Ensure no bottom border for the last item */
}

.project-content {
  display: block;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s ease;
  border-radius: 0;
  height: 100%;
  padding-bottom: 24px;
}

.project-content:hover {
  background-color: #e0f7fa; /* Light cyan background on hover */
  border-radius: 8px; /* Optional rounded corners */
}

.project-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.project-description {
  font-size: 1em;
  margin-bottom: 10px;
  color: #555;
}

.skills {
  margin-top: 10px;
  font-size: 0.9em;
  color: #555;
}

.text-center {
  text-align: center;
  margin-top: 20px;
}
</style>
