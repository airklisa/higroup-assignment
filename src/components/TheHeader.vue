<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import SwitchSlider from './SwitchSlider.vue'

const themeStore = useThemeStore()

const handleSwitchValue = (value: boolean) => {
  console.log(value)
  themeStore.setDarkTheme(value)
}
</script>

<template>
  <header>
    <RouterLink to="/" class="logo">CountryExplorer</RouterLink>
    <div class="nav-wrapper">
      <div class="theme-switch">
        <span>Light</span>
        <SwitchSlider @updateSwitchValue="handleSwitchValue" />
        <span>Dark</span>
      </div>
      <nav>
        <RouterLink to="/" active-class="active"> Home </RouterLink>
        <RouterLink to="/compare" active-class="active"> Compare </RouterLink>
        <RouterLink to="/favorites" active-class="active"> Favorites </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/header';
</style>
