<script setup lang="ts">
import { onMounted, computed, type ComputedRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import type { Country } from '@/types/country.type'
import CountryDetails from '@/components/CountryDetails.vue'

const route = useRoute()
const countriesStore = useCountriesStore()

const countryCode: string = ref(route.params.countryCode as string)

watch(
  () => route.params,
  (newParams) => {
    countryCode.value = newParams.countryCode as string
  }
)

const country = computed(() => {
  return countriesStore.getCountryByCode(countryCode.value)
})
</script>

<template>
  <main>
    <CountryDetails
      v-if="country"
      :flag="country.flags.png"
      :name="country.name.common"
      :region="country.region"
      :population="country.population"
      :capital="country.capital"
      :area="country.area.toString()"
      :currencies="Object.values(country.currencies).map((c) => c.name)"
      :languages="Object.values(country.languages)"
      :neighbors="country.borders"
    />
  </main>
</template>
