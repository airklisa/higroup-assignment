import { computed, type Ref } from 'vue'
import type { Country } from '@/types/country.type'

export function useCountryComparator(countryA: Ref<Country | null>, countryB: Ref<Country | null>) {
  const comparisonResult = computed(() => {
    if (!countryA.value || !countryB.value) {
      return
    }

    if (countryA.value === countryB.value) {
      return 'You are so silly, you just tried comparing a country with itself :P'
    }

    let result = `${countryA.value.name.common} is ${countryA.value.area > countryB.value.area ? 'bigger' : 'smaller'} than ${countryB.value.name.common}. `
    result += `${countryA.value.name.common} has a ${countryA.value.population > countryB.value.population ? 'larger' : 'smaller'} population. `

    const commonLanguages = Object.values(countryA.value.languages).filter((nameA) =>
      Object.values(countryB.value?.languages || {}).includes(nameA)
    )

    if (commonLanguages.length > 0) {
      result += `These countries both have ${commonLanguages.join(', ')} as the official language. `
    } else {
      result += `${countryA.value.name.common} has ${Object.values(countryA.value.languages).join(', ')} as the official language, while ${countryB.value.name.common} has ${Object.values(countryB.value.languages).join(', ')} as the official language. `
    }

    const commonCurrencies = Object.values(countryA.value.currencies)
      .filter((currencyA) =>
        Object.values(countryB.value?.currencies || {}).some(
          (currency) => currency.name === currencyA.name
        )
      )
      .map((currency) => currency.name)

    if (commonCurrencies.length > 0) {
      result += `These countries both use ${commonCurrencies.join(', ')} as a currency. `
    } else {
      result += `${countryA.value.name.common} uses ${Object.values(countryA.value.currencies)
        .map((currency) => currency.name)
        .join(', ')} as a currency, while ${countryB.value.name.common} uses ${Object.values(
        countryB.value.currencies
      )
        .map((currency) => currency.name)
        .join(', ')} as a currency. `
    }

    if (countryA.value.region === countryB.value.region) {
      result += `These countries are both in ${countryA.value.region}. `
    } else {
      result += `${countryA.value.name.common} is in ${countryA.value.region}, while ${countryB.value.name.common} is in ${countryB.value.region}. `
    }

    return result
  })

  return {
    comparisonResult
  }
}
