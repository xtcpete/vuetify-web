<template>

      <v-sheet
        class="profile-container"
        color="grey-lighten-4"
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
                <v-row justify="left" class="social-links mt-2">
                  <v-btn
                    icon
                    :href="$info_data.Links.LinkedIn"
                    color="#00ADB5"
                    class="mx-2"
                    elevation="0"
                    outlined
                    target="_blank"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :href="$info_data.Links.Github"
                    color="#00ADB5"
                    class="mx-2"
                    elevation="0"
                    outlined
                    target="_blank"
                  >
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    :href="$info_data.Links.Instagram"
                    color="#00ADB5"
                    class="mx-2"
                    elevation="0"
                    outlined
                    target="_blank"
                  >
                    <v-icon>mdi-instagram</v-icon>
                  </v-btn>
                </v-row> 
                
                <!-- Resume Button -->
                <v-row justify="left" class="resume-btn mt-2">
                  <v-btn
                    class="mt-4 mx-2"
                    color="black"
                    dark
                    rounded
                    @click="openResume"
                  >
                    Resume
                  </v-btn>
                </v-row>
                <!-- Description -->
                <v-card-text class="profile-description mt-4 text-body-1">
                  {{ $info_data.Highlight }}
                </v-card-text>
                <!-- Education Section -->  
                <v-card-text>
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
              </v-col>
              <v-col cols="12" md="6" justify="center">
                <TagCloud />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      </v-sheet>
</template>

<script setup>
  //animated cloud
  import TagCloud from './TagCloud.vue';
</script>

<script>
  export default {
    methods: {
      openResume() {
        window.open("/resume.pdf", "_blank");
      },
    }
  }
</script>

<style scoped>
.profile-container {
  padding: 20px;
  padding-bottom: 20px;
  padding-top: 0;
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

</style>