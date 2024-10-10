<script setup lang="ts">
import { ref } from 'vue'
import { useCountryComparator } from '@/helpers/countryComparator'
import type { Country } from '@/types/country.type'
import CountrySelector from '@/components/CountrySelector.vue'

const countryA = ref<Country | null>(null)
const countryB = ref<Country | null>(null)

const { comparisonResult } = useCountryComparator(countryA, countryB)

const handleCountrySelected = (selectedCountry: Country, country: 'A' | 'B') => {
  if (country === 'A') {
    countryA.value = selectedCountry
    return
  }

  countryB.value = selectedCountry
}
</script>

<template>
  <main>
    <h1>Compare countries</h1>
    <div class="compare-countries">
      <CountrySelector
        @countrySelected="(selectedCountry: Country) => handleCountrySelected(selectedCountry, 'A')"
      />
      <p>VS</p>
      <CountrySelector
        @countrySelected="(selectedCountry: Country) => handleCountrySelected(selectedCountry, 'B')"
      />
    </div>
    <div class="result">
      <p>{{ comparisonResult }}</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import '../assets/scss/views/compare';
</style>
