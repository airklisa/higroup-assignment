<script setup lang="ts">
import { onMounted, computed, type ComputedRef } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import type { Country } from '@/types/country.type'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const countriesStore = useCountriesStore()
const router = useRouter()

const countryCode = route.params.countryCode as string

const country = computed(() => {
  return countriesStore.getCountryByCode(countryCode)
})
</script>

<template>
  <h1>{{ country?.name.common }}</h1>
</template>
