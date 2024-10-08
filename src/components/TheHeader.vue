<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <span class="logo">CountryExplorer</span>
    <div class="nav-wrapper">
      <div class="theme-switch">
        <span>Light</span>
        <span>Dark</span>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/compare">Compare</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/header';
</style>
