<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import { useThemeStore } from '@/stores/theme'
import TheSearch from '@/components/TheSearch.vue'
import TheDropdown from '@/components/TheDropdown.vue'
import { regions } from '@/helpers/regions'

const countriesStore = useCountriesStore()
const themeStore = useThemeStore()

const isDarkTheme = computed(() => themeStore.isDarkTheme)

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
</script>

<template>
  <section class="filter-countries">
    <div class="filter-countries-content">
      <TheSearch @searchTermUpdated="(value) => handleSearch(value, 'term')" class="search" />
      <TheDropdown
        :items="regions"
        :is-dark-theme="isDarkTheme"
        @itemClicked="(value) => handleSearch(value, 'region')"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/filter-countries';
</style>
