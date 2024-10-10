<script setup lang="ts">
import { computed } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import SearchDropdown from '@/components/SearchDropdown.vue'
import type { Country } from '@/types/country.type'

const countriesStore = useCountriesStore()
const filteredCountries = computed<Country[]>(() => countriesStore.filteredCountries)

const handleSearch = (term: string) => {
  countriesStore.filterCountries(term)
}

const handleCountrySelected = (country: Country) => {
  console.log(country)
}
</script>

<template>
  <main>
    <SearchDropdown
      :countries="filteredCountries"
      @searchTermUpdated="handleSearch"
      @countrySelected="handleCountrySelected"
    />
  </main>
</template>

<style></style>
