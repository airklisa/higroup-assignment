<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const countriesStore = useCountriesStore()

onMounted(async () => {
  await countriesStore.fetchCountries()
})
</script>

<template>
  <TheHeader />

  <div class="router-view-wrapper">
    <RouterView />
  </div>

  <TheFooter style="margin-top: 50px" />
</template>

<style lang="scss">
@import './assets/scss/core/base';
</style>
