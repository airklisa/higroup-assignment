<script setup lang="ts">
import CountryCards from '@/components/CountryCards.vue'
import TheSearch from '@/components/TheSearch.vue'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()

const handleSearch = (value: string) => {
  countriesStore.filterCountriesByTerm(value)
}
</script>

<template>
  <main>
    <TheSearch @searchTermUpdated="handleSearch" />
    <CountryCards />
  </main>
</template>
