import { defineStore } from 'pinia'
import axios from 'axios'
import type { Country } from '@/types/country.type'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [] as Country[],
    filteredCountries: [] as Country[],
    currentPage: 1,
    itemsPerPage: 15
  }),
  actions: {
    async fetchCountries() {
      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital,area,currencies,languages,borders'
      )
      this.countries = response.data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      )
      this.filteredCountries = this.countries
    },
    filterCountriesByRegionAndTerm(term?: string, region?: string) {
      this.filteredCountries = this.countries

      if (region) {
        this.filteredCountries = this.filteredCountries.filter(
          (country: Country) => country.region.toLowerCase() === region.toLowerCase()
        )
      }

      if (term) {
        this.filteredCountries = this.filteredCountries.filter((country: Country) =>
          country.name.common.toLowerCase().includes(term.toLowerCase())
        )
      }

      this.currentPage = 1
    },
    setPage(page: number) {
      this.currentPage = page
    }
  },
  getters: {
    getCountryByCode: (state) => (code: string) => {
      return state.countries.find((country: Country) => country.cca3 === code)
    },
    getCountryNameByCode: (state) => (code: string) => {
      return state.countries.find((country: Country) => country.cca3 === code)?.name.common
    },
    getFilteredCountries: (state) => () => {
      return state.filteredCountries
    },
    getPaginatedCountries: (state) => () => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.filteredCountries.slice(start, end)
    },
    getTotalPages: (state) => () => {
      return Math.ceil(state.filteredCountries.length / state.itemsPerPage)
    }
  }
})
