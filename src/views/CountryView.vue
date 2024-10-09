<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'
import CountryDetails from '@/components/CountryDetails.vue'
import type { Neighbors } from '@/types/neighbors.type'

const router = useRouter()
const route = useRoute()
const countriesStore = useCountriesStore()

const countryCode = ref<string>(route.params.countryCode as string)

watch(
  () => route.params,
  (newParams) => {
    countryCode.value = newParams.countryCode as string
  }
)

const country = computed(() => {
  return countriesStore.getCountryByCode(countryCode.value)
})

const countryNeighbors = computed<Neighbors[]>(() => {
  return (
    country.value?.borders?.map((countryCode: string) => {
      return {
        name: countriesStore.getCountryNameByCode(countryCode) || '',
        countryCode: countryCode
      }
    }) || []
  )
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
      :capital="String(country.capital)"
      :area="country.area.toString()"
      :currencies="
        String(
          Object.values(country.currencies)
            .map((c) => c.name)
            .join(', ')
        )
      "
      :languages="String(Object.values(country.languages).join(', '))"
      :neighbors="countryNeighbors"
      :isFavorite="country.isFavorite"
      @toggleFavorite="countriesStore.toggleFavoriteCountry(country.cca3)"
      @goBack="router.push('/')"
    />
  </main>
</template>
