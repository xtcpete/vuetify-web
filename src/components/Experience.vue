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
              <ol class="timeline-list text-body-1" >
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
                                    outlined
                                    color="cyan-lighten-2"
                                    text-color="white"
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

.timeline-item { position: relative; list-style: none; padding-left: 1rem;}

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
  left: -33px;
  height: 6px;
  width: 6px;
  background: #00ADB5;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 173, 181, 1);
  margin-left: 1rem
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
}

.timeline-item:hover {
  background-color: v-bind('theme.global.current.dark ? "#111111" : "#e0f7fa"');
  transition: background-color 0.3s ease; /* Smooth transition effect */
  border-radius: 8px; /* Optional rounded corners */
}
</style>