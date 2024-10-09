<script setup lang="ts">
import type { PropType } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import FavoritesIcon from './FavoritesIcon.vue'

defineProps({
  flag: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  capital: {
    type: Array as PropType<string[]>,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  currencies: {
    type: Array as PropType<string[]>,
    required: true
  },
  languages: {
    type: Array as PropType<string[]>,
    required: true
  },
  neighbors: {
    type: Array as PropType<string[] | null>,
    default: null
  }
})

const countriesStore = useCountriesStore()
</script>

<template>
  <div class="country-details">
    <div class="country-details-content">
      <div class="name">
        <h1>{{ name }}</h1>
        <FavoritesIcon />
      </div>
      <img :src="flag" :alt="name" />
      <div class="info">
        <div class="info-cell"><span>Region:</span> {{ region }}</div>
        <div class="info-cell"><span>Population:</span> {{ population }}</div>
        <div class="info-cell"><span>Capital:</span> {{ capital.join(', ') }}</div>
        <div class="info-cell"><span>Area:</span> {{ area }}km²</div>
        <div class="info-cell"><span>Currencies:</span> {{ currencies.join(', ') }}</div>
        <div class="info-cell"><span>Languages:</span> {{ languages.join(', ') }}</div>
      </div>
      <p>
        <span>Neighbors: </span>
        <RouterLink
          v-if="neighbors?.length"
          :to="`/country/${item}`"
          v-for="(item, index) in neighbors"
          :key="index"
          >{{ countriesStore.getCountryNameByCode(item) }}
        </RouterLink>
        <span v-else class="none"> None</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-details';
</style>
