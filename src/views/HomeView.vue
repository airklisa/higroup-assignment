<script setup lang="ts">
import { ref } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import CountryCards from '@/components/CountryCards.vue'
import TheSearch from '@/components/TheSearch.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import { regions } from '@/helpers/regions'

const countriesStore = useCountriesStore()

const term: string = ref('')
const region: string = ref('')

const handleSearch = (value: string, type: 'term' | 'region') => {
  if (type === 'term') {
    term.value = value
  }

  if (type === 'region') {
    region.value = value
  }

  countriesStore.filterCountriesByRegionAndTerm(term.value, region.value)
}
</script>

<template>
  <main>
    <TheSearch @searchTermUpdated="(value) => handleSearch(value, 'term')" />
    <TheDropdown :items="regions" @itemClicked="(value) => handleSearch(value, 'region')" />
    <CountryCards />
  </main>
</template>
