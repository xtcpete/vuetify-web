<template>
    <v-sheet 
        class="profile-container" 
        :color="theme.global.current.colors.background"
    >
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-card class="profile-card" elevation="2">
            <v-row>
                <v-col cols="12">
                    <h2 class="text-left">Experiences</h2>
                </v-col>
            </v-row>
            <v-row class="timeline" style="padding-bottom: 48px; padding-right: 24px;">
              <ol class="timeline-list text-body-1" style="width: 100%;">
                <li v-for="(item, index) in sortedExperiencesByKey" :key="index" class="timeline-item" @click="openLink(item.id)" :style="{ cursor: 'pointer' }">
                    <div class="timeline-item-content">
                        <div><text class="text-subtitle font-weight-bold" style="padding-right: 1rem;">{{ item.Company }}</text></div>
                        <div><span class="text-high-emphasis text-body-2" style="padding-right: 1rem;"><text class="font-italic">{{item.Title}}</text>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{ item.Location }}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{{ item.Date }}</span></div>
                        <p class="font-weight-regular" style="color: #797979;">{{ item.Description }}</p>
                        <v-row class="skills" justify="start" align="center">
                                <v-chip
                                    v-for="(skill, skillIndex) in splitSkills(item.Skills)"
                                    :key="skillIndex"
                                    class="mt-3 mr-3 skill-chip"
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    >
                                    {{ skill }}
                                </v-chip>
                        </v-row>
                    </div>
                </li>
              </ol>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        color="orange darken-2"
        multi-line
        timeout="1000"
        top
        >
        No link is available for this experience.
        </v-snackbar>
    </v-sheet>
</template>
  

<script>
export default {
    data() {
        return {
            snackbar: false, // Controls the visibility of the notification popup
        };
    },
    computed: {
        sortedExperiencesByKey() {
            // Sort experiences in reverse chronological order (newest first)
            return Object.keys(this.$experiences_data)
                .sort((a, b) => b - a)
                .map((key) => this.$experiences_data[key]);
        },
        theme() {
            return this.$vuetify.theme;
        },
    },
    methods: {
        openLink(link) {
            if (link) {
                window.open(link, "_blank"); // Open link in a new tab
            } else {
                this.snackbar = true;
            }
            },
        // Split the 'Skills' field into individual skills
        splitSkills(skills) {
          return skills ? skills.split(',').map(skill => skill.trim()) : [];
        },
    },
};
</script>

<style scoped>

.profile-card {
  border-radius: 20px;
  padding: 20px;
}

.timeline .title-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.timeline-list {
  font-size: var(--fs-6);
  margin-left: 45px;
}

.skills {
  margin-left: 0px;
  padding-bottom: 10px;
}

.skill-chip {
  min-width: 20px;
}

.timeline-item { 
  position: relative; 
  list-style: none; 
  padding-left: 1rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 8px;
  padding: 1rem 1rem 1rem 3rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid transparent;
}

.timeline-item:not(:last-child) { margin-bottom: 20px; }

.timeline-list span {
  color: grey;
  font-weight: 1rem;
  line-height: 1.6;
}

.timeline-item:not(:last-child)::before {
  content: "";
  position: absolute;
  top: 20px;
  left: -30px;
  width: 1px;
  height: calc(100% + 18px);
  background: gray;
  margin-left: 1rem;
}

.timeline-item::after {
  content: "";
  position: absolute;
  top: 20px;
  left: -35px;
  height: 12px;
  width: 12px;
  background: linear-gradient(135deg, #4285f4 0%, #2563eb 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.3);
  margin-left: 1rem;
  transition: all 0.3s ease;
}

.profile-container {
  padding: 20px;
}

.profile-card {
  border-radius: 20px;
  padding: 20px;
}

.timeline-item-content {
    padding-top: 10px;
    transition: all 0.3s ease;
}

.timeline-item:hover .timeline-item-content {
    transform: translateX(12px) translateY(-2px);
    background: rgba(66, 133, 244, 0.05);
    border-radius: 12px;
    padding: 16px;
    margin-left: -8px;
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.15);
}

.timeline-item:hover {
  background: linear-gradient(135deg, rgba(66, 133, 244, 0.08) 0%, rgba(37, 99, 235, 0.12) 100%);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(66, 133, 244, 0.25), 0 4px 12px rgba(66, 133, 244, 0.15);
}

.timeline-item:hover::after {
  background: linear-gradient(135deg, #3367d6 0%, #1d4ed8 100%);
  transform: scale(1.5);
  box-shadow: 0 0 0 8px rgba(66, 133, 244, 0.3), 0 0 20px rgba(66, 133, 244, 0.6);
  animation: pulse-dot 1.5s infinite ease-in-out;
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

/* Skill Chip Styles - Different from buttons */
.skill-chip {
  background: rgba(66, 133, 244, 0.1) !important;
  border: 1.5px solid #4285f4 !important;
  color: #4285f4 !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
}

.skill-chip:hover {
  background: rgba(66, 133, 244, 0.15) !important;
  border-color: #3367d6 !important;
  color: #3367d6 !important;
}

.skill-chip.v-chip--selected {
  background: #4285f4 !important;
  color: white !important;
  border-color: #4285f4 !important;
}

/* Pulse animation for timeline dots */
@keyframes pulse-dot {
  0%, 100% {
    box-shadow: 0 0 0 8px rgba(66, 133, 244, 0.3), 0 0 20px rgba(66, 133, 244, 0.6);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(66, 133, 244, 0.1), 0 0 25px rgba(66, 133, 244, 0.8);
  }
}
</style>