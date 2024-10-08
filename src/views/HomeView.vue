<script setup lang="ts">
import { useCountriesStore } from '@/stores/countries'
import CountryCards from '@/components/CountryCards.vue'
import TheSearch from '@/components/TheSearch.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import { regions } from '@/helpers/regions'

const countriesStore = useCountriesStore()

const handleSearch = (value: string) => {
  countriesStore.filterCountriesByTerm(value)
}
</script>

<template>
  <main>
    <TheSearch @searchTermUpdated="handleSearch" />
    <TheDropdown :items="regions" />
    <CountryCards />
  </main>
</template>
