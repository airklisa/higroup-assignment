<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Country } from '@/types/country.type'
import TheSearch from './TheSearch.vue'

defineProps({
  countries: {
    type: Array as PropType<Country[]>,
    required: true
  }
})

const emits = defineEmits(['searchTermUpdated', 'countrySelected'])

const isDropdownActive = ref<boolean>(false)
const targetRef = ref<HTMLElement | null>(null)

const handleSearch = (term: string) => {
  emits('searchTermUpdated', term)
  isDropdownActive.value = true
}

const handleCountrySelected = (country: Country) => {
  emits('countrySelected', country)
  isDropdownActive.value = false
}

onClickOutside(targetRef, () => {
  isDropdownActive.value = false
})
</script>

<template>
  <section class="search-dropdown">
    <TheSearch @click="isDropdownActive = true" @searchTermUpdated="handleSearch" />
    <div ref="targetRef" class="search-dropdown-content" :class="{ 'is-active': isDropdownActive }">
      <ul v-if="countries.length">
        <li
          v-for="country in countries"
          :key="country.cca3"
          @click="handleCountrySelected(country)"
        >
          <div class="country">
            <img :src="country.flags.png" :alt="country.name.common" />
            <span>{{ country.name.common }}</span>
          </div>
        </li>
      </ul>
      <p v-else class="no-countries">No countries</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '../assets/scss/components/search-dropdown';
</style>
