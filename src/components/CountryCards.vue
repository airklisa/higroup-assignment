<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import type { Country } from '@/types/country.type'
import CountryCard from '@/components/CountryCard.vue'

const countriesStore = useCountriesStore()
const router = useRouter()

const countries = computed<Country[]>(() => countriesStore.getPaginatedCountries())
const errorMessage = computed<string>(() => countriesStore.errorMessage)
const isLoading = computed<boolean>(() => countriesStore.isLoading)

const navigateToCountry = (country: Country) => {
  router.push({
    name: 'country-details',
    params: { countryCode: country.cca3 }
  })
}

onBeforeUnmount(() => {
  countriesStore.resetCountriesFilter()
})
</script>

<template>
  <section class="country-cards">
    <div class="error" v-if="errorMessage">
      <p class="network">{{ errorMessage }}</p>
    </div>
    <div class="error" v-else-if="!countries.length">
      <p>No countries</p>
    </div>
    <ul v-else>
      <li v-for="country in countries" :key="country.cca3">
        <CountryCard
          :flag="country.flags.png"
          :name="country.name.common"
          :region="country.region"
          :population="country.population"
          :is-favorite="country.isFavorite"
          @click="navigateToCountry(country)"
          @toggle-favorite="countriesStore.toggleFavoriteCountry(country.cca3)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-cards';
</style>
