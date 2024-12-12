<template>
  <div>
    <div ref="tagCloud" class="tag-cloud-container"></div>
  </div>
</template>

<script>
import './cloud.js';
import { useDisplay } from 'vuetify';
import { ref, computed } from 'vue';

export default {
  name: 'TagCloud',
  mounted() {
    // Data for your tag cloud
    var entries = this.$info_data['keySkills'].split(',')
    // make entries to dictionary
    for (var i in entries) {
        entries[i] = { label: entries[i], url: 'https://www.google.com/search?q=' + entries[i] }
    }

    var settings = {
        entries: entries,
        width: '100%',
        height: '100%',
        radius: '50%',
        radiusMin: 75,
        bgDraw: false,
        bgColor: '#1B262C',
        opacityOver: 1.00,
        opacityOut: 0.05,
        opacitySpeed: 5,
        fov: 800,
        speed: 0.3,
        fontSize: '2.5vh',
        fontColor: '#00ADB5',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontSretch: 'normal',
        fontToUpperCase: true
    };

    const { smAndDown } = useDisplay(); // Check if the screen size is small or smaller

    // Computed property to decide whether to show TagCloud
    const showTagCloud = computed(() => !smAndDown.value);

    // Initialize the tag cloud
    if (showTagCloud.value){
        new SVG3DTagCloud(this.$refs.tagCloud, settings);
    }
  },
};
</script>

<style scoped>
.tag-cloud-container {
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
}
</style>