type Currency = {
  name: string
  symbol: string
}

type Language = string

export type Country = {
  cca3: string
  name: {
    common: string
    official: string
  }
  flags: {
    svg: string
    png: string
  }
  population: number
  region: string
  capital: string[]
  area: number
  currencies: Record<string, Currency>
  languages: Record<string, Language>
  borders: string[]
  isFavorite?: boolean
}
