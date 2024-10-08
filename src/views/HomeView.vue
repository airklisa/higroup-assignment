<script setup lang="ts">
import { onMounted, computed, type ComputedRef } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import type { Country } from '@/types/country.type'
import { useRouter } from 'vue-router'

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
  <div>
    <h1>Countries</h1>
    <ul>
      <li
        v-for="country in countries"
        :key="country.name.common"
        @click="navigateToCountry(country)"
      >
        {{ country.name.common }}
      </li>
    </ul>
  </div>
</template>
