<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const countriesStore = useCountriesStore()

onMounted(async () => {
  await countriesStore.fetchCountries()
  console.log('Fetched countries:', countriesStore.countries)
})
</script>

<template>
  <TheHeader />

  <div class="router-view-wrapper">
    <RouterView />
  </div>

  <TheFooter />
</template>

<style lang="scss">
@import './assets/scss/core/base';
</style>
