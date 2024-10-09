<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import SwitchSlider from './SwitchSlider.vue'

const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const handleSwitchValue = (value: boolean) => {
  themeStore.setDarkTheme(value)
}
</script>

<template>
  <header>
    <RouterLink to="/" class="logo">Country<span>Explorer</span></RouterLink>
    <div class="nav-wrapper">
      <div class="theme-switch">
        <span>Light</span>
        <SwitchSlider :current-switch-value="isDarkTheme" @updateSwitchValue="handleSwitchValue" />
        <span>Dark</span>
      </div>
      <nav>
        <RouterLink to="/" active-class="active"> Home </RouterLink>
        <RouterLink to="/compare" active-class="active"> Compare </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/header';
</style>
