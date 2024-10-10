<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import { useThemeStore } from '@/stores/theme'
import SearchDropdown from '@/components/SearchDropdown.vue'
import type { Country } from '@/types/country.type'

const router = useRouter()
const emits = defineEmits(['countrySelected'])

const themeStore = useThemeStore()
const countriesStore = useCountriesStore()

const isDarkTheme = computed<boolean>(() => themeStore.isDarkTheme)
const filteredCountries = computed<Country[]>(() => countriesStore.filteredCountries)

const country = ref<Country | null>(null)

const handleSearch = (term: string) => {
  countriesStore.filterCountries(term)
}

const handleCountrySelected = (selectedCountry: Country) => {
  country.value = selectedCountry
  countriesStore.resetCountriesFilter()
  emits('countrySelected', selectedCountry)
}
</script>

<template>
  <section class="country-selector">
    <SearchDropdown
      :countries="filteredCountries"
      :isDarkTheme="isDarkTheme"
      @searchTermUpdated="handleSearch"
      @countrySelected="handleCountrySelected"
      @clickedOutside="countriesStore.resetCountriesFilter()"
    />
    <section class="selected-country">
      <div class="country" v-if="country" @click="router.push(`/country/${country.cca3}`)">
        <img :src="country?.flags.png" :alt="country?.name.common" />
        <span>{{ country.name.common }}</span>
      </div>
      <div v-else class="no-country">
        <p>Select a country to compare...</p>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-selector';
</style>
