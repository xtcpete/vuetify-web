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
                  <v-img
                      :src="publication.Cover"
                      height="150px"
                      contain
                      alt="Publication Cover"
                  ></v-img>
                  </v-col>

                  <!-- Content Section -->
                  <v-col cols="auto" class="mt-0">
                  <div class="title">{{ publication.Title }}</div>
                  <div class="authors">{{ publication.Authors }}</div>
                  <div class="journal">{{ publication.Journal }}</div>
                  <v-btn color="#00ADB5" :href="publication.id" target="_blank" small>Read More</v-btn>
                  </v-col>
              </v-row>
            <!-- Conditional HR -->
            <hr v-if="index < sortedPublicationsByKey.length - 1" style="margin-top: 24px;"/>
            </div>
        </v-col>
        </v-row>
      </v-card>
    </v-sheet>
</template>
  
<script>
export default {
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
</style>