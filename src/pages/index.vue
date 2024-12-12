<template>
  <div>
    <section id="home">
      <Home />
    </section>

    <section id="publications">
      <Publications />
    </section>

    <section id="experience">
      <Experience />
    </section>

    <section id="projects">
      <Projects />
    </section>
  </div>
</template>

<script setup>
import Experience from '@/components/Experience.vue';
import Home from '@/components/Home.vue';
import Projects from '@/components/Projects.vue';
import Publications from '@/components/Publications.vue';
</script>
