<template>

      <v-sheet
        class="profile-container"
        :color="theme.global.current.colors.background"
      >
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-card class="profile-card" elevation="2">
            <!-- Profile Image -->
            <v-row>
              <v-col cols="12" md="6">
                <v-card-title class="justify-center">
                  <v-avatar size="200">
                    <v-img
                      src="/profile_image.png"
                      alt="Profile Image"
                    ></v-img>
                  </v-avatar>
                </v-card-title>
                <!-- Name -->
                <h2 class="profile-name">Gonglin Chen</h2>
                <!-- Social Links -->
                <v-row justify="start" class="social-links mt-2">
                  <v-btn
                    icon
                    :href="$info_data.Links.LinkedIn"
                    class="mx-2 modern-btn-icon"
                    elevation="0"
                    target="_blank"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :href="$info_data.Links.Github"
                    class="mx-2 modern-btn-icon"
                    elevation="0"
                    target="_blank"
                  >
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :href="$info_data.Links.GoogleScholar"
                    class="mx-2 modern-btn-icon"
                    elevation="0"
                    target="_blank"
                  >
                    <v-icon>mdi-school</v-icon>
                  </v-btn>
                </v-row> 
                
                <!-- Description -->
                <v-card-text class="profile-description mt-4 text-body-1">
                  {{ $info_data.Highlight }}
                </v-card-text>
                <!-- Education Section -->  
                <v-card-text>
                  <h3 class="section-title mb-3">Education</h3>
                  <ul class="education-list text-body-1">
                    <li class="mt-3">
                      <text class="text-subtitle font-weight-bold">University of Southern California</text> <br />
                      Ph.D in Computer Science <br />
                      <text class="text-body-2">September 2024 – Present</text>
                    </li>
                    <li class="mt-3">
                      <text class="text-subtitle font-weight-bold">University of Southern California</text> <br />
                      MS in Applied Data Science <br />
                      <text class="text-body-2">January 2023 – May 2024</text>
                    </li>
                    <li class="mt-3">
                      <text class="text-subtitle font-weight-bold">University of California, Davis</text> <br />
                      BS in Statistics, Machine Learning <br />
                      <text class="text-body-2">July 2017 – June 2022</text>
                    </li>
                  </ul>
                </v-card-text>
                
                <!-- News Section for Small Screens -->
                <v-card-text class="d-md-none">
                  <h3 class="section-title mb-3">Latest News</h3>
                  <div class="news-container-mobile">
                    <div 
                      v-for="(news, index) in sortedNewsData" 
                      :key="index"
                      class="news-item-simple"
                      @click="openNewsLink(news.Link)"
                      :class="{ 'clickable': news.Link }"
                    >
                      <div class="news-simple-content">
                        <div class="news-date-row">{{ news.Date }}</div>
                        <div class="news-title-row">
                          <span class="news-title-simple">{{ news.Title }}</span>
                          <v-chip 
                            :color="getNewsTypeColor(news.Type)"
                            size="x-small"
                            class="news-type-chip-simple"
                          >
                            {{ news.Type }}
                          </v-chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-col>
              
              <!-- News Section for Large Screens -->
              <v-col cols="12" md="6" class="d-none d-md-flex">
                <v-card-text style="width: 100%; height: 100%;">
                  <h3 class="section-title mb-3">Latest News</h3>
                  <div class="news-container-desktop">
                    <div 
                      v-for="(news, index) in sortedNewsData" 
                      :key="index"
                      class="news-item-simple"
                      @click="openNewsLink(news.Link)"
                      :class="{ 'clickable': news.Link }"
                    >
                      <div class="news-simple-content">
                        <div class="news-date-row">{{ news.Date }}</div>
                        <div class="news-title-row">
                          <span class="news-title-simple">{{ news.Title }}</span>
                          <v-chip 
                            :color="getNewsTypeColor(news.Type)"
                            size="x-small"
                            class="news-type-chip-simple"
                          >
                            {{ news.Type }}
                          </v-chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      </v-sheet>
</template>

<script setup>
  //animated cloud

</script>

<script>
  export default {
    methods: {
      openResume() {
        window.open("/resume.pdf", "_blank");
      },
      openNewsLink(link) {
        if (link) {
          window.open(link, "_blank");
        }
      },
      getNewsTypeColor(type) {
        switch (type) {
          case 'Publication':
            return '#4285f4';
          case 'Academic':
            return '#00ADB5';
          case 'Award':
            return '#f4b400';
          default:
            return 'grey';
        }
      }
    },
    computed: {
      theme() {
        return this.$vuetify.theme;
      },
      sortedNewsData() {
        if (!this.$news_data) return [];
        return Object.keys(this.$news_data)
          .sort((a, b) => a - b) // Sort by key in ascending order (largest index last, but we'll reverse)
          .map((key) => this.$news_data[key])
          .reverse() // Reverse to show latest news (largest index) first
          .slice(0, 12); // Show up to 12 news items for the simplified layout
      }
    }
  }
</script>

<style scoped>
.profile-container {
  padding: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
}

.profile-card {
  border-radius: 20px;
  padding: 20px;
}

.profile-name {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  padding-left: 1rem;
}

.social-links {
  padding-left: 1rem;
}
.social-links v-btn {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.education-list {
  list-style: none;
  padding: 0;
}

.education-list li {
  text-align: left;
}

.education-list v-icon {
  margin-right: 8px;
}

.mt-3 {
  margin-top: 12px;
}

.resume-btn {
  padding-left: 1rem;
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
}

.modern-btn:hover {
  background: linear-gradient(135deg, #3367d6 0%, #1d4ed8 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4) !important;
}

.modern-btn-icon {
  background: linear-gradient(135deg, #4285f4 0%, #2563eb 100%) !important;
  color: white !important;
  border: none !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3) !important;
}

.modern-btn-icon:hover {
  background: linear-gradient(135deg, #3367d6 0%, #1d4ed8 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4) !important;
}

/* Section Titles */
.section-title {
  color: #4285f4;
  font-weight: 600;
  margin-bottom: 16px;
}

/* News Styles */
.news-container-desktop {
  padding-right: 8px;
}

.news-container-mobile {
  padding-right: 8px;
}

.news-item-simple {
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-on-surface), 0.02);
  transition: all 0.3s ease;
}

.news-item-simple.clickable {
  cursor: pointer;
}

.news-item-simple.clickable:hover {
  background: rgba(66, 133, 244, 0.08);
  border-color: rgba(66, 133, 244, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.15);
}

.news-simple-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.news-date-row {
  font-size: 0.75em;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  font-weight: 500;
  width: 100%;
  padding-bottom: 2px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.news-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.news-title-simple {
  font-size: 0.9em;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.2;
  flex-grow: 1;
}

.news-type-chip-simple {
  font-size: 0.65em !important;
  height: 18px !important;
  flex-shrink: 0;
}

</style>