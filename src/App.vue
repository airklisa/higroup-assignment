<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()

onMounted(async () => {
  await countriesStore.fetchCountries()
  console.log('Fetched countries:', countriesStore.countries)
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/compare">Compare</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import './assets/scss/core/base';
</style>
