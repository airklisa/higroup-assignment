<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import { useThemeStore } from '@/stores/theme'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()

const isDarkTheme = computed(() => themeStore.isDarkTheme)

onMounted(async () => {
  await countriesStore.fetchCountries()
})
</script>

<template>
  <div class="app-wrapper" :class="{ 'dark-theme': isDarkTheme }">
    <TheHeader />

    <div class="router-view-wrapper">
      <RouterView />
    </div>

    <TheFooter style="margin-top: 50px" />
  </div>
</template>

<style lang="scss">
@import './assets/scss/core/base';
</style>
