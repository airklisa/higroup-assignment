<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import CountryCards from '@/components/CountryCards.vue'
import TheSearch from '@/components/TheSearch.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import ThePagination from '@/components/ThePagination.vue'
import { regions } from '@/helpers/regions'

const countriesStore = useCountriesStore()

const currentPage = computed<number>(() => countriesStore.currentPage)
const totalPages = computed<number>(() => countriesStore.getTotalPages())

const term = ref<string>('')
const region = ref<string>('')

const handleSearch = (value: string, type: 'term' | 'region') => {
  if (type === 'term') {
    term.value = value
  }

  if (type === 'region') {
    region.value = value
  }

  countriesStore.filterCountriesByRegionAndTerm(term.value, region.value)
}

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
    <TheSearch @searchTermUpdated="(value) => handleSearch(value, 'term')" />
    <TheDropdown :items="regions" @itemClicked="(value) => handleSearch(value, 'region')" />
    <CountryCards />
    <ThePagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @changePage="handleChangePage"
    />
  </main>
</template>
