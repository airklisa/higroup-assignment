import { defineStore } from 'pinia'
import axios from 'axios'
import type { Country } from '@/types/country.type'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [] as Country[],
    filteredCountries: [] as Country[]
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
    filterCountriesByTerm(term: string) {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.common.toLowerCase().includes(term.toLowerCase())
      )
    },
    filterCountriesByRegionAndTerm(term?: string, region?: string) {
      this.filteredCountries = this.countries

      if (region) {
        this.filteredCountries = this.filteredCountries.filter(
          (country) => country.region.toLowerCase() === region.toLowerCase()
        )
      }

      if (term) {
        this.filteredCountries = this.filteredCountries.filter((country) =>
          country.name.common.toLowerCase().includes(term.toLowerCase())
        )
      }
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
    }
  }
})
