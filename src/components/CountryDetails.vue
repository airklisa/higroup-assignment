<script setup lang="ts">
import { PropType } from 'vue'
import { useCountriesStore } from '@/stores/countries'

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
  <div class="country-card">
    <div class="country-card-content">
      <img :src="flag" :alt="name" />
      <p><span>Name:</span> {{ name }}</p>
      <p><span>Region:</span> {{ region }}</p>
      <p><span>Population:</span> {{ population }}</p>
      <p><span>Capital:</span> {{ currencies.join(', ') }}</p>
      <p><span>Area:</span> {{ area }}km²</p>
      <p><span>Currencies:</span> {{ currencies.join(', ') }}</p>
      <p><span>Languages:</span> {{ languages.join(', ') }}</p>
      <p>
        <span>Neighbors:</span>
        <RouterLink
          v-if="neighbors.length"
          :to="`/country/${item}`"
          v-for="(item, index) in neighbors"
          :key="index"
          >{{ countriesStore.getCountryNameByCode(item) }}
        </RouterLink>
        <span v-else> None</span>
      </p>
    </div>
  </div>
</template>
