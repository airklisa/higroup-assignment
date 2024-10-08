<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import type { Country } from '@/types/country.type'
import CountryCard from '@/components/CountryCard.vue'

const countriesStore = useCountriesStore()
const router = useRouter()

const countries: ComputedRef<Country[]> = computed(() => countriesStore.countries)

const navigateToCountry = (country: Country) => {
  router.push({
    name: 'country-details',
    params: { countryCode: country.cca3 }
  })
}
</script>

<template>
  <section class="country-cards">
    <ul>
      <li v-for="country in countries" :key="country.cca3">
        <CountryCard
          :flag="country.flags.png"
          :name="country.name.common"
          :region="country.region"
          :population="country.population"
          @click="navigateToCountry(country)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/country-cards';
</style>
