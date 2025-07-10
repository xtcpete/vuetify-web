<template>
    <v-sheet
        class="profile-container"
        :color="theme.global.current.colors.background"
      >

      <v-card class="pub-card" elevation="2" style="padding-bottom: 48px;">
        <v-row>
            <v-col cols="12">
                <h2 class="text-left">Publications</h2>
            </v-col>
        </v-row>
    
        <!-- Vertical layout for publications -->
        <v-row>
        <v-col cols="12" v-for="(publication, index) in sortedPublicationsByKey" :key="index">
            <div class="publication-item">
              <v-row style="padding-left: 1rem;">
                  <!-- Image Section -->
                  <v-col cols="3" class="d-none d-md-flex mt-0">
                  <div class="publication-image-container">
                    <v-img
                        :src="publication.Cover"
                        class="publication-image"
                        alt="Publication Cover"
                    ></v-img>
                  </div>
                  </v-col>

                  <!-- Content Section -->
                  <v-col cols="auto" class="mt-0 publication-content">
                  <div class="title">{{ publication.Title }}</div>
                  <div class="authors">{{ publication.Authors }}</div>
                  <div class="journal">{{ publication.Journal }}</div>
                  <v-btn class="modern-btn" @click="openLink(publication.id)" small>Read More</v-btn>
                  </v-col>
              </v-row>
            <!-- Conditional HR -->
            <hr v-if="index < sortedPublicationsByKey.length - 1" style="margin-top: 24px;"/>
            </div>
        </v-col>
        </v-row>
      </v-card>

      <v-snackbar
        v-model="snackbar"
        color="orange darken-2"
        multi-line
        timeout="1000"
        top
        >
        Coming soon!
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
    sortedPublicationsByKey() {
      // Access the global data and sort by key in descending order
      return Object.keys(this.$publications_data)
        .sort((a, b) => b - a) // Sort keys in descending order
        .map((key) => this.$publications_data[key]); // Map keys to their values
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

.profile-container {
  padding: 20px;
  padding-top: 0;
  padding-bottom: 0;
}

.pub-card {
  border-radius: 20px;
  padding: 20px;
}

.publication-item {
  border-radius: 12px;
  padding: 16px;
  margin: -16px;
  margin-bottom: 8px;
}

.publication-image-container {
  width: 100%;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(66, 133, 244, 0.05);
  border: 2px solid rgba(66, 133, 244, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.publication-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}


.title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 8px;
  white-space: normal; /* Allow the title to wrap to multiple lines */
}

.authors {
  color: #666;
  font-size: 0.9em;
  line-height: 1.4em;
  margin-bottom: 4px;
}

.journal {
  font-size: 0.9em;
  color: #797979;
  font-style: italic;
  margin-bottom: 12px;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

/* Modern Button Styles */
.modern-btn {
  background: linear-gradient(135deg, #4285f4 0%, #2563eb 100%) !important;
  color: white !important;
  border: none !important;
  padding: 8px 16px !important;
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
</style>