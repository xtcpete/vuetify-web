<template>
    <v-sheet class="profile-container" :color="theme.global.current.colors.background">
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
                                variant="outlined"
                                color="primary"
                                size="small"
                                >
                                {{ skill }}
                            </v-chip>
                    </v-row>
                  </a>
                </v-col>
            </v-row>
          
            <!-- Single Toggle Button -->
            <div class="text-center" v-if="projects.length > maxVisibleProjects">
                <v-btn @click="toggleCollapse" class="modern-btn" size="large">
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
      showMore: false, // Controls the expand/collapse state of projects list
      maxVisibleProjects: 6, // Maximum number of projects to show initially
      isSmallScreen: window.innerWidth < 960, // Responsive layout detection
    };
  },
  computed: {
    projects() {
      // Sort projects to show demo projects first, then regular projects
      return Object.values(this.$projects_data).sort((a, b) => {
        return b.Demo - a.Demo;
      });
    },
    theme() {
      return this.$vuetify.theme;
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
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 0;
  height: 100%;
  padding-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.project-content:hover {
  background: linear-gradient(135deg, rgba(66, 133, 244, 0.08) 0%, rgba(37, 99, 235, 0.12) 100%);
  border-radius: 12px;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(66, 133, 244, 0.25), 0 4px 12px rgba(66, 133, 244, 0.15);
  border-left: 4px solid #4285f4;
  padding-left: 24px;
}

.project-content:hover .project-title {
  color: #4285f4;
  transform: translateX(4px);
}

.project-content:hover .project-description {
  transform: translateX(4px);
}

.project-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.project-description {
  font-size: 1em;
  margin-bottom: 10px;
  color: v-bind('theme.global.current.dark ? "#EEEEEE" : "#555"');
  transition: all 0.3s ease;
}

.skills {
  margin-top: 10px;
  font-size: 0.9em;
  color: v-bind('theme.global.current.dark ? "#EEEEEE" : "#555"');
  transition: all 0.3s ease;
}

.project-content:hover .skills {
  transform: translateX(4px);
}

.text-center {
  text-align: center;
  margin-top: 20px;
}

/* Modern Button Styles */
.modern-btn {
  background: linear-gradient(135deg, #4285f4 0%, #2563eb 100%) !important;
  color: white !important;
  border: none !important;
  padding: 12px 24px !important;
  font-weight: 500 !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3) !important;
  border-radius: 20px !important;
}

.modern-btn:hover {
  background: linear-gradient(135deg, #3367d6 0%, #1d4ed8 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4) !important;
}

/* Modern Chip Styles */
.modern-chip {
  background: linear-gradient(135deg, #4285f4 0%, #2563eb 100%) !important;
  color: white !important;
  border: none !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 6px rgba(66, 133, 244, 0.3) !important;
}

.modern-chip:hover {
  background: linear-gradient(135deg, #3367d6 0%, #1d4ed8 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 10px rgba(66, 133, 244, 0.4) !important;
}

/* Skill Chip Styles - Informational tags, not interactive */
.skill-chip {
  background: rgba(66, 133, 244, 0.08) !important;
  border: 1px solid rgba(66, 133, 244, 0.3) !important;
  color: #4285f4 !important;
  font-weight: 500 !important;
  font-size: 0.75rem !important;
  cursor: default !important;
}
</style>
