<script setup lang="ts">
import { computed } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import FilterCountries from '@/components/FilterCountries.vue'
import CountryCards from '@/components/CountryCards.vue'
import ThePagination from '@/components/ThePagination.vue'

const countriesStore = useCountriesStore()

const currentPage = computed<number>(() => countriesStore.currentPage)
const totalPages = computed<number>(() => countriesStore.getTotalPages())

const handleChangePage = (type: 'add' | 'subtract') => {
  if (type === 'add') {
    countriesStore.setPage(currentPage.value + 1)
  }

  if (type === 'subtract') {
    countriesStore.setPage(currentPage.value - 1)
  }
}
</script>

<template>
  <main>
    <FilterCountries />
    <CountryCards />
    <ThePagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @changePage="handleChangePage"
    />
  </main>
</template>
