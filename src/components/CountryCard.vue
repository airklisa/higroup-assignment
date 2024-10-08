<script setup lang="ts">
import { PropType } from 'vue'
import type { Country } from '@/types/country.type'

defineProps({
  country: {
    type: Object as PropType<Country>,
    required: true
  }
})
</script>

<template>
  <div class="country-card">
    {{ country.name.common }} {{ country.cca3 }} {{ country.capital[0] }}
  </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-card';
</style>
